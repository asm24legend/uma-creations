import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, SITE } from "@/lib/constants";
import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/types";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .limit(8);
  const featured = (data ?? []) as Product[];

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="font-heading text-4xl text-brand sm:text-5xl">
            {SITE.tagline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink/80">
            Every piece is made by hand, with love and attention to detail.
          </p>
          <Link
            href="/jewellery"
            className="mt-8 inline-block rounded-full bg-brand px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Shop Jewellery
          </Link>
        </div>
      </section>

      {/* Category tiles */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="font-heading text-2xl">Shop by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="flex h-40 items-center justify-center rounded-lg border border-brand-light font-heading text-xl transition-colors hover:bg-brand-light hover:text-brand"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="font-heading text-2xl">Featured</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {featured.length === 0 && (
          <p className="mt-4 text-sm text-ink/60">No featured products yet.</p>
        )}
      </section>
    </>
  );
}