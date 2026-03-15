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
            Le Cinéma Silverado
          </h1>

          <div className="bg-white p-8 rounded-lg shadow-md text-gray-800 leading-relaxed">
            <p className="mb-4">
              Cinéma classé <strong>&quot;Art et Essai&quot;</strong> à Marthon,
              proposant jusqu&apos;à 6 séances par semaine. Depuis 2018, Le
              Silverado est uniquement géré par les bénévoles de
              l&apos;association CINEMARTHON. Doté d&apos;une salle en gradins
              de 114 fauteuils et du son numérique, il propose chaque semaine 5
              à 7 séances.
            </p>
            <p className="mb-4">
              Le Silverado défend une ligne éditoriale ambitieuse faisant la
              part belle au cinéma d&apos;auteur et aux versions originales.
              Cela lui vaut le classement salle{" "}
              <strong>&quot;Art et Essai&quot;</strong> depuis de nombreuses
              années. Toutefois, chaque semaine, un film au moins est consacré à
              un cinéma de divertissement, à vocation populaire et destiné à un
              large public.
            </p>
            <p className="mb-4">
              La programmation exigeante et équilibrée est renforcée par un
              travail d&apos;animation mené avec le concours de
              l&apos;Université de Pays. C&apos;est dans ce cadre que chaque
              mois sont organisés des débats autour de l&apos;actualité.
            </p>
            <p>
              Le Silverado participe également aux opérations scolaires{" "}
              <strong>&quot;maternelle au cinéma&quot;</strong>,{" "}
              <strong>&quot;École et cinéma&quot;</strong>
              et répond aux demandes ponctuelles de films d&apos;associations ou
              d&apos;enseignants.
            </p>
          </div>
        </div>
        {/* Section 3: Cinéma - Photo à droite */}
        <div className="space-y-6 md:space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Projecteur numérique, son Dolby 5.1, confort des salles,
                accessibilité, et bien plus encore. Découvrez les installations
                modernes et accueillantes de notre cinéma, conçues pour offrir
                une expérience cinématographique inoubliable à chaque visite.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="relative w-full h-48 md:h-80 bg-gray-300 rounded-lg overflow-hidden">
                {/* Image placeholder - remplacer par l'image réelle */}
                <Image
                  src="/images/cinema-1.jpg"
                  alt="Cinéma Silverado"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Cinéma - Photo à gauche */}
        <div className="space-y-6 md:space-y-12">
          <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-8">
            <div className="flex-1 space-y-3 md:space-y-4 order-first md:order-none">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                De l&apos;espace pour vos jambes, des sièges confortables, et
                une ambiance chaleureuse. Découvrez comment notre cinéma met le
                confort des spectateurs au cœur de son expérience.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="relative w-full h-48 md:h-80 bg-gray-300 rounded-lg overflow-hidden">
                {/* Image placeholder - remplacer par l'image réelle */}
                <Image
                  src="/images/cinema-2.jpg"
                  alt="Cinéma Silverado 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Cinéma - Photo à droite */}
        <div className="space-y-6 md:space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                &quot;Le Silverado, le cinéma qu&apos;il est bien pour venir voir des
                films.&quot;
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="relative w-full h-48 md:h-80 bg-gray-300 rounded-lg overflow-hidden">
                {/* Image placeholder - remplacer par l'image réelle */}
                <Image
                  src="/images/cinema-3.jpg"
                  alt="Cinéma Silverado 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
