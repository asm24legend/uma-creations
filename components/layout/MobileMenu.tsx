import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function MobileMenu({
  open,
  pathname,
}: {
  open: boolean;
  pathname: string;
}) {
  if (!open) return null;

  return (
    <nav className="border-t border-brand-light bg-white md:hidden">
      <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block py-3 text-base font-medium ${
                pathname.startsWith(link.href) ? "text-brand" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="border-t border-brand-light">
          <Link href="/login" className="block py-3 text-base font-medium">
            My Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}