import Image from "next/image";
import Link from "next/link";

// Hooks
import { useRouter } from "next/router";

// Icons
import { Play } from "./Icons";

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

  return (
    <nav className="space-x-6 bg-white shadow-sm">
      <div className="container flex items-center justify-center mx-auto space-x-6 md:justify-between">
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

      </div>
    </nav>
  );
};

export default Navbar;
