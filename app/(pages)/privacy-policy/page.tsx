import type { Metadata } from "next";
import PageContainer from "@/components/ui/PageContainer";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <PageContainer title="Privacy Policy" intro="Last updated: [date]">
      <p>
        {SITE.name} respects your privacy. This page explains what we collect
        and why.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Name, email, phone number, and delivery address when you order</li>
        <li>Your account details if you create an account</li>
        <li>Messages you send us through the contact form</li>
        <li>Basic site usage data (for example, which pages are visited)</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To process, ship, and support your orders</li>
        <li>To send order confirmations and updates</li>
        <li>To reply to your messages and improve the site</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>
        We only share what is needed to run the shop: delivery partners (to
        deliver your order) and service providers that host the site, store the
        data, and send email. We do not sell your personal data.
      </p>
      <h2>Cookies and storage</h2>
      <p>
        We store your shopping cart in your browser so it is still there when
        you return. Login sessions also use cookies.
      </p>
      <h2>Your choices</h2>
      <p>
        You can ask us to see, correct, or delete your data at any time by
        writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </PageContainer>
  );
}