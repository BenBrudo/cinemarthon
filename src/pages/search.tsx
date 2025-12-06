// Types
import type { NextPage } from "next";

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

        {/* Iframe Google Maps centré */}
        <div className="flex justify-center my-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2790.9426095237386!2d0.43742947691097894!3d45.61179727107676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fe4d43a150ecdd%3A0xd7d2928a48818580!2sCinema%20Le%20Silverado!5e0!3m2!1sfr!2sfr!4v1757054017297!5m2!1sfr!2sfr"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cinema Le Silverado Map"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
