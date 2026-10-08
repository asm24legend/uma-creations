import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";

export const metadata: Metadata = { title: "Return Policy" };

export default function ReturnPolicyPage() {
  return (
    <PageContainer title="Return & Refund Policy">
      <p>
        Because our pieces are handmade, we ask you to read this before ordering.
      </p>
      <h2>Damaged or wrong item</h2>
      <p>
        If your order arrives damaged or is not what you ordered, contact us
        within [48 hours] of delivery with photos or an unboxing video. We will
        send a replacement or refund after checking.
      </p>
      <h2>Change of mind</h2>
      <p>
        [Unused items in original condition can be returned within 7 days of
        delivery. The customer pays return shipping.] Edit or remove this to
        match your policy.
      </p>
      <h2>Not returnable</h2>
      <ul>
        <li>Custom or made-to-order pieces</li>
        <li>Items marked as final sale</li>
        <li>Earrings, for hygiene reasons [edit as needed]</li>
      </ul>
      <h2>Handmade variations</h2>
      <p>
        Slight differences in colour, size, or finish are natural in handmade
        work and are not defects. Colours may also look different on different
        screens.
      </p>
      <h2>Refunds</h2>
      <p>
        Approved refunds are issued within [5-7] business days to the original
        payment method.
      </p>
      <p>
        To start a return, <Link href="/contact">contact us</Link> with your
        order number.
      </p>
    </PageContainer>
  );
}