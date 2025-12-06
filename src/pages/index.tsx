// Types
import type { NextPage } from "next";
import type { MoviesData } from "../types/movies-config";

// React
import { useState, useMemo } from "react";

// Data
import weeklyMoviesData from "../data/weekly-movies.json";

// Hooks
import useHomeData from "../hooks/useHomeData";

// Components
import Heading from "../components/Heading";
import LoaderCard from "../components/Card/Loader";
import useHomeMovie from "../hooks/useHomeMovie";
import { Download } from "../components/Icons";

import FeaturedMoviedCard from "../components/Card/FeaturedMovie";

const Home: NextPage = () => {
  const { error } = useHomeData();

  // Tous les films chronologiquement
  const allMovies = useMemo(() => (weeklyMoviesData as MoviesData).movies, []);
  const moviesPerPage = 5;

  // Calcul de l'index du film du jour (ou du prochain) avec useMemo
  const currentMovieIndex = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliser à minuit pour la comparaison

    // Trouver le premier film dont la date est aujourd'hui ou dans le futur
    for (let i = 0; i < allMovies.length; i++) {
      const movieDate = new Date(allMovies[i].screening_date);
      movieDate.setHours(0, 0, 0, 0);
      
      if (movieDate >= today) {
        return i;
      }
    }

    // Si tous les films sont passés, retourner le dernier index valide
    return Math.max(0, allMovies.length - moviesPerPage);
  }, [allMovies]);

  const [startIndex, setStartIndex] = useState(currentMovieIndex);

  // Obtenir les 5 films à afficher à partir de startIndex
  const moviesData = allMovies.slice(startIndex, startIndex + moviesPerPage);

  const handleNext = () => {
    if (startIndex + moviesPerPage < allMovies.length) {
      setStartIndex(startIndex + moviesPerPage);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - moviesPerPage));
    }
  };

  // Fonction pour obtenir l'intervalle de dates des films affichés
  const getDateRange = () => {
    if (moviesData.length === 0) return "";

    const dates = moviesData.map(movie => new Date(movie.screening_date));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    const formatDate = (date: Date) =>
      date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });

    if (minDate.getTime() === maxDate.getTime()) {
      return formatDate(minDate);
    }

    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  };

  const { movieData, movieLoading, movieError } = useHomeMovie(
    moviesData[0]?.id,
    moviesData[1]?.id,
    moviesData[2]?.id,
    moviesData[3]?.id,
    moviesData[4]?.id
  );

  // Ajouter les dates de diffusion aux données des films
  const moviesWithScreenings = movieData?.map((movie, index) => ({
    ...movie,
    screening_date: moviesData[index]?.screening_date,
    hours: moviesData[index]?.hours
  }));
  return (
    <div className="relative px-6 md:px-0">

      <div className="space-y-8">
        <section className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <Heading>Prochaines séances ({getDateRange()})</Heading>
            <div className="hidden gap-2 md:flex">
              <button
                onClick={handlePrevious}
                disabled={startIndex === 0}
                className={`px-4 py-2 rounded-md transition-colors ${startIndex === 0
                    ? 'text-gray-500 bg-gray-200 cursor-not-allowed'
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                Précédent
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex + moviesPerPage >= allMovies.length}
                className={`px-4 py-2 rounded-md transition-colors ${startIndex + moviesPerPage >= allMovies.length
                    ? 'text-gray-500 bg-gray-200 cursor-not-allowed'
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                Suivant
              </button>
              <a
                href="/cinema/programme-decembre-2025.pdf"
                download="Programme-Décembre-2025.pdf"
                className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                title="Télécharger le programme de décembre 2025"
              >
                <Download className="w-6 h-6" />
              </a>
              <a
                href="/cinema/programme-janvier-2026.pdf"
                download="Programme-Janvier-2026.pdf"
                className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                title="Télécharger le programme de janvier 2026"
              >
                <Download className="w-6 h-6" />
              </a>
            </div>
          </div>

          {error && (
            <p className="opacity-50">
              Something went wrong! Please try again later.
            </p>
          )}
          <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-5 snap-x snap-mandatory">
            {movieLoading || movieError ? (
              <LoaderCard count={5} type="card-large" />
            ) : (
              moviesWithScreenings?.map((item) => (
                <div key={item?.id} className="flex-shrink-0 w-full snap-start md:w-auto">
                  <FeaturedMoviedCard movie={item} />
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
