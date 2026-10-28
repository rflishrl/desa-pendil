"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <h1 className="mb-3 text-3xl font-bold">Terjadi kesalahan</h1>
      <p className="mb-8 max-w-md text-muted">
        Halaman gagal dimuat. Silakan coba lagi.
      </p>
      <Button onClick={reset}>Coba lagi</Button>
    </Container>
  );
}
