import type { Metadata } from "next";
import PageContainer from "@/components/ui/PageContainer";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <PageContainer title="Shipping Policy">
      <h2>Processing time</h2>
      <p>
        Every item is handmade or hand-finished, so orders are processed within
        [7-8] business days. Made-to-order or custom pieces may take longer. We
        will tell you the timeline before you pay.
      </p>
      <h2>Delivery time</h2>
      <p>
        Once shipped, delivery within India usually takes [5-7] business days,
        depending on your location.
      </p>
      <h2>Shipping charges</h2>
      <ul>
        <li>Flat shipping fee: ₹[60] per order</li>
        <li>Free shipping on orders above ₹[999]</li>
      </ul>
      <h2>Where we ship</h2>
      <p>We currently ship within India only.</p>
      <h2>Tracking</h2>
      <p>
        Once your order ships, we will send you the tracking details by email or
        WhatsApp.
      </p>
    </PageContainer>
  );
}