// Icons
import { PropsWithChildren } from "react";
import { Github, Twitter, Link } from "../components/Icons";

export const Footer: React.FC = () => (
  <footer className="px-6 mt-24 text-gray-900 bg-center bg-cover shadow-md md:px-0 bg-gray-200/40">
    <div className="mx-auto text-center py-14 md:w-4/12 md:px-0">
      <div className="flex flex-col space-y-8">
        <div className="space-y-4">
          <Title>Le Silverado</Title>

          <div className="opacity-50">
            <p>CINEMA LE SILVERADO - 10 RUE DES ECOLES, 16380 MARTHON / (ACCES PMR). </p>
            <p>NORMAL : 5,5€ / REDUIT (demandeurs d’emploi, étudiants, -16 ans) : 4,5€</p>
            <p>CINE MERCREDI ET CINEFAMILLE : 3€</p>
            <p>Carte 5 entrées : 22,5€ soit 4,5€ la place </p> 
            <p>Carte 10 entrées : 45€ + 1 entrée gratuite soit 4,1€ la place.</p>
            <p>All content and images belong to{" "}</p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              TMDb
            </a>
            .
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/eggsy"
            className="hover:underline"
          >
            <Github className="w-8 h-8 transition-opacity hover:opacity-75" />
          </a>

          <a
            rel="noreferrer"
            target="_blank"
            href="https://twitter.com/eggsydev"
            className="hover:underline"
          >
            <Twitter className="w-8 h-8 transition-opacity hover:opacity-75" />
          </a>

          <a
            rel="noreferrer"
            className="hover:underline"
            target="_blank"
            href="https://eggsy.xyz"
          >
            <Link className="w-8 h-8 transition-opacity hover:opacity-75" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const Title = ({ children }: PropsWithChildren) => (
  <span className="text-xl font-semibold">{children}</span>
);

export default Footer;
