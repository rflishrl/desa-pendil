import { useRouterState } from "@tanstack/react-router";

export function TopProgressBar() {
  const isPending = useRouterState({
    select: (state) => state.status === "pending",
  });

  if (!isPending) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Memuat halaman"
      className="fixed inset-x-0 top-0 z-50 h-[3px] overflow-hidden bg-primary/20"
    >
      <div className="h-full w-full origin-left animate-[top-loader_1.2s_ease-in-out_infinite] bg-primary" />
    </div>
  );
}
