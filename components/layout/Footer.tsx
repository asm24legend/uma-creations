import Link from "next/link";
import { Instagram, Whatsapp } from "react-bootstrap-icons";
import { CATEGORIES, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-light">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-heading text-xl text-brand">{SITE.name}</p>
          <p className="mt-2 text-sm">{SITE.tagline}</p>
          <div className="mt-4 flex gap-4">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-brand"
            >
              <Instagram size={22} />
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-brand"
            >
              <Whatsapp size={22} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-semibold">Shop</p>
          <ul className="mt-2 space-y-1 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="hover:text-brand">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/events" className="hover:text-brand">
                Upcoming Events
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Help</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/about" className="hover:text-brand">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand">Contact</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-brand">Shipping Policy</Link></li>
            <li><Link href="/return-policy" className="hover:text-brand">Return Policy</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-brand">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/60 py-4 text-center text-xs">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}