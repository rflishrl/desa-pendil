<script lang="ts">
	import CultureSection from '#lib/components/sections/CultureSection.svelte';
	import FeaturesSection from '#lib/components/sections/FeaturesSection.svelte';
	import LeaderSection from '#lib/components/sections/LeaderSection.svelte';
	import OfficialsSection from '#lib/components/sections/OfficialsSection.svelte';
	import Container from '#lib/components/ui/Container.svelte';
	import HeadTags from '#lib/components/ui/HeadTags.svelte';
	import MediaImage from '#lib/components/ui/MediaImage.svelte';
	import PageHero from '#lib/components/ui/PageHero.svelte';
	import { villageOrigin } from '#lib/data/village.js';
</script>

<HeadTags
	title="Profil Desa - Desa Pendil"
	description="Profil dan informasi seputar Desa Pendil."
	path="/profile"
/>

<PageHero title="Profil Desa Pendil" description="Profil dan informasi seputar Desa Pendil" />

<section id="asal-usul" aria-labelledby="asal-usul-title" class="relative z-10 -mt-24 lg:-mt-32">
	<Container size="wide">
		<div
			class="relative isolate overflow-hidden rounded-3xl px-6 py-12 shadow-[0_8px_30px_rgba(0,0,0,0.1)] lg:px-12 lg:py-[60px]"
		>
			<MediaImage
				src="/images/bg-event.webp"
				alt=""
				width={1920}
				height={1920}
				aria-hidden="true"
				class="absolute inset-0 -z-10 h-full w-full object-cover"
			/>
			<div class="mx-auto flex max-w-[1238px] flex-col gap-8 lg:gap-[42px]">
				<div
					class="relative h-[251px] overflow-hidden rounded-2xl bg-canvas sm:h-[360px] lg:h-[537px]"
				>
					<MediaImage
						src={villageOrigin.image}
						variant="full"
						alt="Pemandangan Desa Pendil"
						width={1600}
						height={1200}
						class="h-full w-full object-cover"
					/>
				</div>
				<div class="space-y-4">
					<p class="text-lg font-semibold text-ink lg:text-xl">Asal Usul</p>
					<h2 id="asal-usul-title" class="text-2xl font-bold lg:text-[32px]">Desa Pendil</h2>
					<p class="text-base leading-7 text-muted lg:text-xl lg:leading-8">
						{villageOrigin.text}
					</p>
				</div>
			</div>
		</div>
	</Container>
</section>

<LeaderSection />
<OfficialsSection />
<FeaturesSection />
<CultureSection />
