import type { Metadata } from "next";
import { Envelope, Instagram, Whatsapp, GeoAlt } from "react-bootstrap-icons";
import PageContainer from "@/components/ui/PageContainer";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const links = [
    { icon: <Whatsapp size={20} />, label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}` },
    { icon: <Instagram size={20} />, label: "Instagram", href: SITE.instagram },
    { icon: <Envelope size={20} />, label: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <PageContainer
      title="Contact Us"
      intro="Questions, custom orders, or just want to say hello? We'd love to hear from you."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-brand-light p-4 text-sm no-underline hover:bg-brand-light"
          >
            {l.icon}
            <span className="truncate text-ink">{l.label}</span>
          </a>
        ))}
      </div>
      <p className="flex items-center gap-2 text-sm text-ink/70">
        <GeoAlt size={16} /> {SITE.city}
      </p>

      <h2>Send us a message</h2>
      <div className="mt-4">
        <ContactForm />
      </div>
    </PageContainer>
  );
}