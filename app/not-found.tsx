import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted">404</span>
      <h1 className="display mt-4 text-4xl md:text-5xl">Page not found</h1>
      <p className="mt-3 max-w-sm text-muted">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link href="/" className="mt-8">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
