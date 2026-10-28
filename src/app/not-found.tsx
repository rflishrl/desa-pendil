import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="mb-2 text-lg font-semibold text-primary-700">404</p>
      <h1 className="mb-3 text-3xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mb-8 max-w-md text-muted">
        Halaman yang Anda cari tidak ada atau sudah dipindahkan.
      </p>
      <ButtonLink href="/">Kembali ke Beranda</ButtonLink>
    </Container>
  );
}
