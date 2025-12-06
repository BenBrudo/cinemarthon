import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Hooks
import { useRouter } from "next/router";

// Icons
import { Play, Menu, Close } from "./Icons";

const links = [
  {
    href: "/",
    label: "Programmation",
  },
  {
    href: "/about",
    label: "Nos Bénévoles",
  },
  {
    href: "/search",
    label: "Le cinéma",
  },
];

export const Navbar: React.FC = () => {
  const { route } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="space-x-6 bg-white shadow-sm">
      <div className="container flex items-center justify-between mx-auto space-x-6">
        <div className="flex items-center md:space-x-14">
          <Link
            href="/"
            className="flex items-center py-5 space-x-2 md:py-0 text-brand-dark-blue"
          >
            <div>
              <Play className="w-6 h-6" />
            </div>

            <span className="text-lg font-semibold">Le Silverado</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="items-center hidden md:flex">
            {links.map((link) => (
              <Link href={link.href} key={link.label}>
                <li
                  className={`h-full p-6 font-medium text-brand-dark-blue transition-colors hover:bg-gray-200 ${
                    route === link.href && "bg-gray-200"
                  }`}
                >
                  {link.label}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-brand-dark-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <Close className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200" role="menu">
          <ul className="container mx-auto">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block p-4 font-medium text-brand-dark-blue transition-colors hover:bg-gray-200 ${
                    route === link.href && "bg-gray-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
