import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Hooks
import { useRouter } from "next/router";

// Icons
import { Play, Menu, Close, Download } from "./Icons";

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="space-x-6 bg-white shadow-sm" onKeyDown={handleKeyDown}>
      <div className="container flex items-center justify-between mx-auto space-x-6">
        <div className="flex items-center md:space-x-14">
          <Link
            href="/"
            className="flex items-center py-5 space-x-2 md:py-0 text-brand-dark-blue"
          >
            <div>
              <Play className="w-8 h-8" />
            </div>

            <span className="text-4xl md:text-5xl font-medium" style={{ fontFamily: 'Monoton, cursive' }}>Le Silverado</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="items-center hidden md:flex">
            {links.map((link) => (
              <Link href={link.href} key={link.label}>
                <li
                  className={`h-full p-6 font-bold text-brand-dark-blue transition-colors hover:bg-gray-200 ${
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
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200">
          <ul className="container mx-auto">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block p-4 font-medium text-brand-dark-blue transition-colors hover:bg-gray-200 ${
                    route === link.href && "bg-gray-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Download Links */}
            <li className="border-t border-gray-200">
              <a
                href="/cinema/programme-famille.pdf"
                download="Programme-Famille.pdf"
                className="flex items-center gap-2 p-4 font-medium text-brand-dark-blue transition-colors hover:bg-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download className="w-5 h-5" />
                Programme Famille
              </a>
            </li>
            <li>
              <a
                href="/cinema/programme-classique.pdf"
                download="Programme-Classique.pdf"
                className="flex items-center gap-2 p-4 font-medium text-brand-dark-blue transition-colors hover:bg-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download className="w-5 h-5" />
                Programme Classique
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
