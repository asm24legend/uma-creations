import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageContainer
      title="Our Story"
      intro="Handmade with love, one piece at a time."
    >
      {/* Replace the text below with Uma's real story */}
      <p>
        Uma Creations began as a small passion project: making jewellery and
        clothing by hand, with care for every stitch and bead. Today, every
        piece is still made by hand, in small batches.
      </p>
      <h2>What we make</h2>
      <ul>
        <li>Handcrafted jewellery</li>
        <li>Hand-finished fashion pieces</li>
        <li>Small gifts and accessories</li>
      </ul>
      <h2>Why handmade</h2>
      <p>
        Because handmade pieces are unique. Small variations in colour or
        finish are part of their charm, and no two are exactly alike.
      </p>
      <p>
        Want something custom? <Link href="/contact">Get in touch</Link>.
      </p>
    </PageContainer>
  );
}