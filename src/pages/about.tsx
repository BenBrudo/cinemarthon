// Types
import type { NextPage } from "next";
import Image from "next/image";

const AboutUs: NextPage = () => (
  <>
    <div className="absolute inset-0 shadow-md bg-gradient-to-r from-brand-dark-blue to-brand-blue h-60 -z-10" />

    <div className="space-y-24">
      <div className="py-6">
        <h1 className="text-4xl font-semibold text-center text-white md:text-left">
          Les B&eacute;n&eacute;voles du Silverado
        </h1>
      </div>

      {/* Section 1: Bénévoles - Photo à droite */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-700">L&apos;&eacute;quipe des b&eacute;n&eacute;voles</h2>
            <p className="text-gray-600 leading-relaxed">
              Texte descriptif pour la première photo des bénévoles. 
              Vous pouvez ajouter une description détaillée de votre équipe 
              et de son engagement auprès du cinéma Silverado.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
              {/* Image placeholder - remplacer par l'image réelle */}
              <Image
                src="/images/team-1.jpg"
                alt="Équipe des bénévoles"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Bénévoles - Photo à gauche */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex-1 space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Texte descriptif pour la deuxième photo des bénévoles.
              Continuez à raconter l&apos;histoire de votre équipe et les valeurs 
              qui vous unissent.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
              {/* Image placeholder - remplacer par l'image réelle */}
              <Image
                src="/images/team-2.jpg"
                alt="Équipe des bénévoles 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Cinéma - Photo à droite */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-700">Le Cin&eacute;ma Silverado</h2>
            <p className="text-gray-600 leading-relaxed">
              Vidéoprojecteur numérique (et non pas une kineton), son Dolby 7.1, confort des salles, accessibilité,
              et bien plus encore. Découvrez les installations modernes et accueillantes
              de notre cinéma, conçues pour offrir une expérience cinématographique
              inoubliable à chaque visite.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
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
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex-1 space-y-4">
            <p className="text-gray-600 leading-relaxed">
              De l&apos;espace pour vos jambes, des sièges confortables, et une ambiance chaleureuse.
              Découvrez comment notre cinéma met le confort des spectateurs au cœur de son expérience.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
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
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Nourriture interdite, pas de bruits et profitez pleinement de votre séance.
              Découvrez nos règles de savoir-vivre en salle pour garantir une expérience agréable
              à tous nos spectateurs.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
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

      {/* Section 6: Cinéma - Photo à gauche */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex-1 space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Le Silverado, le cinéma qu&apos;il est bien pour venir voir des films.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
              {/* Image placeholder - remplacer par l'image réelle */}
              <Image
                src="/images/cinema-4.jpg"
                alt="Cinéma Silverado 4"
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
export default AboutUs;
