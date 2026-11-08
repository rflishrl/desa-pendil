import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { Panel } from "@/components/ui/Panel";
import { galleryImages as placeholderImages } from "@/data/village";
import { getGalleryImagesServerFn } from "@/lib/api/functions";
import { GalleryGrid } from "@/sections/GalleryGrid";

const PAGE_SIZE = 6;

const gallerySearchSchema = z.object({
  page: z.coerce.number().int().min(1).optional().catch(1),
});

export const Route = createFileRoute("/gallery")({
  validateSearch: gallerySearchSchema,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page } }) => {
    const fetched = await getGalleryImagesServerFn();
    const allImages = fetched ?? placeholderImages;
    const totalPages = Math.max(1, Math.ceil(allImages.length / PAGE_SIZE));
    const currentPage = Math.min(Math.max(page || 1, 1), totalPages);
    const images = allImages.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );

    return {
      images,
      page: currentPage,
      totalPages,
    };
  },
  head: () => ({
    meta: [
      { title: "Galeri Desa - Desa Pendil" },
      {
        name: "description",
        content: "Kumpulan foto kegiatan Desa Pendil.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { images, page, totalPages } = Route.useLoaderData();

  return (
    <>
      <PageHero
        title="Galeri Desa Pendil"
        description="Kumpulan foto kegiatan Desa Pendil"
        trail={[
          { label: "Layanan Publik", href: "/services" },
          { label: "Galeri Desa Pendil" },
        ]}
      />
      <section
        aria-label="Foto kegiatan"
        className="relative z-10 -mt-24 lg:-mt-32"
      >
        <Container size="wide">
          <Panel className="space-y-12 lg:space-y-20">
            <h2 className="text-center text-[32px] font-bold md:sr-only">
              Semua Foto
            </h2>
            {images.length > 0 ? (
              <GalleryGrid images={images} />
            ) : (
              <EmptyState
                title="Belum ada foto"
                description="Foto kegiatan akan tampil di sini."
              />
            )}
            <Pagination
              page={page}
              totalPages={totalPages}
              basePath="/gallery"
            />
          </Panel>
        </Container>
      </section>
    </>
  );
}
