import fs from 'node:fs';
import path from 'node:path';
import { expect, test, type Page } from '@playwright/test';

const SCREENSHOT_DIR = path.resolve('.baseline-screenshots/after');

async function attachErrorCollectors(page: Page) {
	const consoleErrors: string[] = [];
	const pageErrors: string[] = [];
	const serverErrors: string[] = [];

	page.on('console', (msg) => {
		if (msg.type() === 'error') consoleErrors.push(msg.text());
	});
	page.on('pageerror', (err) => pageErrors.push(err.message));
	page.on('response', (res) => {
		if (res.status() >= 500) serverErrors.push(`${res.status()} ${res.url()}`);
	});

	return { consoleErrors, pageErrors, serverErrors };
}

test('all public routes render cleanly with SEO tags and 0 runtime errors', async ({
	page,
	request
}) => {
	const { consoleErrors, pageErrors, serverErrors } = await attachErrorCollectors(page);
	const capture = process.env.CAPTURE_AFTER === '1';
	if (capture) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

	const robotsRes = await request.get('/robots.txt');
	expect(robotsRes.status()).toBe(200);
	expect(await robotsRes.text()).toContain('Sitemap:');

	const sitemapRes = await request.get('/sitemap.xml');
	expect(sitemapRes.status()).toBe(200);
	expect(await sitemapRes.text()).toContain('<urlset');

	if (process.env.REQUIRE_LIVE_BACKEND === '1') {
		const apiBase = (process.env.API_BASE_URL || 'http://localhost:4000/api').replace(/\/+$/, '');
		const healthRes = await request.get(`${apiBase}/health`);
		expect(healthRes.status()).toBe(200);
		const newsRes = await request.get(`${apiBase}/news/v1?limit=5`);
		expect(newsRes.status()).toBe(200);
		const galleryRes = await request.get(`${apiBase}/gallery/v1?limit=5`);
		expect(galleryRes.status()).toBe(200);
	}

	const routes = [
		{ name: 'home', path: '/' },
		{ name: 'article', path: '/article' },
		{ name: 'services', path: '/services' },
		{ name: 'profile', path: '/profile' },
		{ name: 'gallery', path: '/gallery' }
	];

	for (const route of routes) {
		await page.setViewportSize({ width: 1440, height: 900 });
		const res = await page.goto(route.path, { waitUntil: 'load' });
		expect(res?.status()).toBe(200);
		await page.evaluate(() => document.fonts.ready);

		const title = await page.title();
		expect(title.trim().length).toBeGreaterThan(0);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\//);
		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);

		if (capture) {
			await page.waitForTimeout(300);
			await page.screenshot({
				path: path.join(SCREENSHOT_DIR, `${route.name}-desktop.png`),
				fullPage: true
			});
			await page.setViewportSize({ width: 390, height: 844 });
			await page.waitForTimeout(200);
			await page.screenshot({
				path: path.join(SCREENSHOT_DIR, `${route.name}-mobile.png`),
				fullPage: true
			});
		}
	}

	expect(consoleErrors).toEqual([]);
	expect(pageErrors).toEqual([]);
	expect(serverErrors).toEqual([]);
});

test('404 page, mobile drawer, and hero search work cleanly', async ({ page }) => {
	const { consoleErrors, pageErrors, serverErrors } = await attachErrorCollectors(page);
	const capture = process.env.CAPTURE_AFTER === '1';
	if (capture) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/', { waitUntil: 'load' });
	await page.evaluate(() => document.fonts.ready);

	const openBtn = page.getByRole('button', { name: /buka menu navigasi/i });
	await openBtn.click();
	await expect(page.locator('#mobile-nav-dialog')).toBeVisible();
	if (capture) {
		await page.waitForTimeout(250);
		await page.screenshot({
			path: path.join(SCREENSHOT_DIR, 'home-mobile-menu-open.png'),
			fullPage: true
		});
	}
	await page.getByRole('button', { name: /tutup menu navigasi/i }).click();
	await expect(page.locator('#mobile-nav-dialog')).toBeHidden();

	await page.fill('#hero-search', 'Tari Remo');
	await page.getByRole('button', { name: /^cari$/i }).click();
	await page.waitForURL('**/article?q=Tari+Remo');
	await expect(page.locator('#semua-berita-title')).toContainText('Tari Remo');

	await page.setViewportSize({ width: 1440, height: 900 });
	const res404 = await page.goto('/halaman-tidak-ada-404', { waitUntil: 'load' });
	expect(res404?.status()).toBe(404);
	await expect(page.locator('h1')).toContainText(/tidak ditemukan/i);
	if (capture) {
		await page.screenshot({
			path: path.join(SCREENSHOT_DIR, 'not-found-desktop.png'),
			fullPage: true
		});
		await page.setViewportSize({ width: 390, height: 844 });
		await page.screenshot({
			path: path.join(SCREENSHOT_DIR, 'not-found-mobile.png'),
			fullPage: true
		});
	}

	const resArticle404 = await page.goto('/article/id-tidak-ada-404', { waitUntil: 'load' });
	expect(resArticle404?.status()).toBe(404);
	await expect(page.locator('h1')).toContainText(/berita tidak ditemukan/i);

	expect(consoleErrors.filter((m) => !m.includes('status of 404'))).toEqual([]);
	expect(pageErrors).toEqual([]);
	expect(serverErrors).toEqual([]);
});
