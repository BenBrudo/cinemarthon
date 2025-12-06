// Types
import type { NextPage } from "next";
import Image from "next/image";

const SearchPage: NextPage = () => {

  return (
    <>
      <div className="absolute inset-0 shadow-md bg-gradient-to-r from-brand-dark-blue to-brand-blue h-80 -z-10" />

      <div className="px-6 space-y-12 md:px-0">
        <div className="py-6 space-y-6">
          <h1 className="text-4xl font-semibold text-center text-white md:text-left">
            Le Cinéma
          </h1>

          <div className="bg-white p-8 rounded-lg shadow-md text-gray-800 leading-relaxed">
            <p className="mb-4">
              Cinéma classé <strong>&quot;Art et Essai&quot;</strong> à Marthon, proposant jusqu&apos;à 6 séances par semaine. 
              Depuis 2018, Le Silverado est uniquement géré par les bénévoles de l&apos;association CINEMARTHON. 
              Doté d&apos;une salle en gradins de 114 fauteuils et du son numérique, il propose chaque semaine 5 à 6 séances.
            </p>
            <p className="mb-4">
              Le Silverado défend une ligne éditoriale ambitieuse faisant la part belle au cinéma d&apos;auteur et aux versions originales. 
              Cela lui vaut le classement salle <strong>&quot;Art et Essai&quot;</strong> depuis de nombreuses années. 
              Toutefois, chaque semaine, un film au moins est consacré à un cinéma de divertissement, à vocation populaire et destiné à un large public.
            </p>
            <p className="mb-4">
              La programmation exigeante et équilibrée est renforcée par un travail d&apos;animation mené avec le concours de l&apos;Université de Pays. 
              C&apos;est dans ce cadre que chaque mois sont organisés des débats autour de l&apos;actualité.
            </p>
            <p>
              Le Silverado participe également aux opérations scolaires <strong>&quot;maternelle au cinéma&quot;</strong>, <strong>&quot;École et cinéma&quot;</strong> 
              et répond aux demandes ponctuelles de films d&apos;associations ou d&apos;enseignants.
            </p>
          </div>
        </div>

        {/* Image carte avec lien vers Google Maps */}
        <div className="flex justify-center my-8">
          <a
            href="https://www.google.com/maps/place/Cinema+Le+Silverado/@45.611797,0.437429,15z"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <Image
              src="/cinema/cinema-map.svg"
              alt="Carte de localisation du Cinéma Le Silverado - Cliquez pour ouvrir Google Maps"
              width={600}
              height={450}
              className="hover:opacity-90 transition-opacity duration-300"
              unoptimized
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
