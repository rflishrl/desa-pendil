"use client";

import { useState } from "react";
import { LuShare2 } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

/** Uses the native share sheet when available, otherwise copies the page URL. */
export function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState("");

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("Tautan disalin");
    } catch {
      // user dismissed the share sheet or clipboard is blocked
      setStatus("");
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline" onClick={handleShare}>
        Bagikan
        <LuShare2 className="size-6" aria-hidden />
      </Button>
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-muted">
        {status}
      </p>
    </div>
  );
}
