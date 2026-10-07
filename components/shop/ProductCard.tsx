import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-brand-light text-sm text-brand/60">
        {/* Real photo goes here in Week 2 */}
        No photo yet
      </div>
      <h3 className="mt-3 text-sm font-medium group-hover:text-brand">
        {product.name}
      </h3>
      <p className="text-sm text-ink/70">{formatPrice(product.price)}</p>
    </Link>
  );
}