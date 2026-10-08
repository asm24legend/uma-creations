import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-heading text-6xl text-brand">404</p>
      <h1 className="mt-4 font-heading text-2xl">Page not found</h1>
      <p className="mt-2 text-ink/70">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-brand px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}