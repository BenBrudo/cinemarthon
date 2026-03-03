// Types
import type { NextPage } from "next";
import Image from "next/image";

const AboutUs: NextPage = () => (
  <>
    <div className="absolute inset-0 shadow-md bg-gradient-to-r from-brand-dark-blue to-brand-blue h-40 md:h-60 -z-10" />

    <div className="px-4 md:px-8 lg:px-12 space-y-12 md:space-y-24">
      <div className="py-4 md:py-6">
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-white md:text-left">
          Les B&eacute;n&eacute;voles du Silverado
        </h1>
      </div>

      {/* Section 1: Bénévoles - Photo à droite */}
      <div className="space-y-6 md:space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-1 space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
              L&apos;&eacute;quipe des b&eacute;n&eacute;voles
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Au cœur du cinéma Silverado bat une équipe de bénévoles
              passionnés, unis par leur amour du septième art et leur
              attachement à ce lieu unique. Chaque semaine, ils donnent de leur
              temps avec enthousiasme pour accueillir chaleureusement les
              spectateurs, partager leur passion du cinéma et perpétuer la magie
              de la projection en salle. Plus qu&apos;une simple équipe,
              c&apos;est une véritable famille cinéphile qui fait vivre ce
              cinéma associatif avec dévouement et convivialité.
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="relative w-full h-48 md:h-80 bg-gray-300 rounded-lg overflow-hidden">
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
      <div className="space-y-6 md:space-y-12">
        <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-8">
          <div className="flex-1 space-y-3 md:space-y-4 order-first md:order-none">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              De l&apos;accueil des spectateurs à la cabine de projection, en
              passant par la billetterie et la buvette, chaque bénévole apporte
              sa pierre à l&apos;édifice avec générosité. Leur motivation ?
              Préserver un lieu de culture accessible à tous, créer du lien
              social dans leur commune, et transmettre leur passion pour le
              cinéma aux nouvelles générations. C&apos;est cet engagement
              désintéressé et cette énergie communicative qui font du Silverado
              bien plus qu&apos;un simple cinéma : un véritable lieu de vie et
              de partage.
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="relative w-full h-48 md:h-80 bg-gray-300 rounded-lg overflow-hidden">
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

      {/* Section 3: Galerie photos des bénévoles */}
      <div className="pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Photo 1 */}
          <div className="relative w-full h-64 md:h-96 bg-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/images/Dawn et son mari.jpg"
              alt="Bénévoles à l'accueil"
              fill
              className="object-cover"
            />
          </div>

          {/* Photo 2 */}
          <div className="relative w-full h-64 md:h-96 bg-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/images/Helene Delage.jpg"
              alt="Hélène Delage"
              fill
              className="object-cover"
            />
          </div>

          {/* Photo 3 */}
          <div className="relative w-full h-64 md:h-96 bg-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/images/Jean Yves et serge.jpg"
              alt="Jean-Yves et Serge en cabine"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
export default AboutUs;
