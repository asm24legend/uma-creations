"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Cart3, List, Search, Person } from "react-bootstrap-icons";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useCartStore } from "@/store/cartStore";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  useEffect(() => setMounted(true), []);
  // Close the mobile menu whenever the page changes
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-light bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo: swap for <Image src="/logo.svg" /> once you have it */}
        <Link href="/" className="font-heading text-2xl text-brand">
          {SITE.name}
        </Link>

        {/* Desktop tabs */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand ${
                  active ? "text-brand" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="Search" className="hover:text-brand">
            <Search size={20} />
          </Link>
          <Link
            href="/login"
            aria-label="Account"
            className="hidden hover:text-brand sm:block"
          >
            <Person size={22} />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative hover:text-brand"
          >
            <Cart3 size={22} />
            {mounted && count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <List size={28} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} pathname={pathname} />
    </header>
  );
}