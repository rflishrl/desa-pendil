import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { Panel } from "@/components/ui/Panel";
import { EmptyState } from "@/components/ui/EmptyState";
import { galleryImages as placeholderImages } from "@/data/village";
import { getGalleryImages } from "@/lib/api";
import { GalleryGrid } from "@/sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeri Desa",
  description: "Kumpulan foto kegiatan Desa Pendil.",
};

const PAGE_SIZE = 6;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const sp = await searchParams;
  const galleryImages = (await getGalleryImages()) ?? placeholderImages;
  const raw = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const totalPages = Math.max(1, Math.ceil(galleryImages.length / PAGE_SIZE));
  const page = Math.min(Math.max(Number.parseInt(raw ?? "", 10) || 1, 1), totalPages);
  const images = galleryImages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHero
        title="Galeri Desa Pendil"
        description="Kumpulan foto kegiatan Desa Pendil"
        trail={[{ label: "Layanan Publik", href: "/services" }, { label: "Galeri Desa Pendil" }]}
      />
      <section aria-label="Foto kegiatan" className="relative z-10 -mt-24 lg:-mt-32">
        <Container size="wide">
          <Panel className="space-y-12 lg:space-y-20">
            <h2 className="text-center text-[32px] font-bold md:sr-only">Semua Foto</h2>
            {images.length > 0 ? (
              <GalleryGrid images={images} />
            ) : (
              <EmptyState title="Belum ada foto" description="Foto kegiatan akan tampil di sini." />
            )}
            <Pagination page={page} totalPages={totalPages} basePath="/gallery" />
          </Panel>
        </Container>
      </section>
    </>
  );
}
