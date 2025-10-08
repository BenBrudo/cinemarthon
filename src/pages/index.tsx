// Types
import type { NextPage } from "next";
import type { MoviesData } from "../types/movies-config";

// React
import { useState } from "react";

// Data
import weeklyMoviesData from "../data/weekly-movies.json";
import familyMoviesData from "../data/family-movies.json";

// Hooks
import useHomeData from "../hooks/useHomeData";

// Components
import Heading from "../components/Heading";
import LoaderCard from "../components/Card/Loader";
import { SearchInput } from "./search";
import useHomeMovie from "../hooks/useHomeMovie";
import useHomeMovieFamille from "../hooks/useHomeMovieFamille";

import FeaturedMoviedCard from "../components/Card/FeaturedMovie";

const Home: NextPage = () => {
  const { data, loading, error } = useHomeData();

  // Films de la semaine
  const allWeeklyMovies = (weeklyMoviesData as MoviesData).movies;
  const moviesPerWeek = 5;
  const maxWeeks = Math.ceil(allWeeklyMovies.length / moviesPerWeek);

  // Fonction pour trouver la semaine courante basée sur la date actuelle
  const getCurrentWeekIndex = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliser à minuit pour la comparaison

    for (let weekIdx = 0; weekIdx < maxWeeks; weekIdx++) {
      const weekMovies = allWeeklyMovies.slice(
        weekIdx * moviesPerWeek,
        (weekIdx + 1) * moviesPerWeek
      );

      // Vérifier si la date actuelle est dans cette semaine
      const weekDates = weekMovies.map(movie => {
        const date = new Date(movie.screening_date);
        date.setHours(0, 0, 0, 0);
        return date;
      });

      const weekTimestamps = weekDates.map(d => d.getTime());
      const minDate = new Date(Math.min(...weekTimestamps));
      const maxDate = new Date(Math.max(...weekTimestamps));

      // Si aujourd'hui est entre la première et la dernière date de projection de la semaine
      if (today >= minDate && today <= maxDate) {
        return weekIdx;
      }

      // Si aujourd'hui est avant la première date, on considère que c'est la semaine courante
      if (today < minDate) {
        return weekIdx;
      }
    }

    // Si on est après toutes les dates, retourner la dernière semaine
    return maxWeeks - 1;
  };

  const [weekIndex, setWeekIndex] = useState(getCurrentWeekIndex);

  const moviesData = allWeeklyMovies.slice(
    weekIndex * moviesPerWeek,
    (weekIndex + 1) * moviesPerWeek
  );
  const moviesDataFamille = (familyMoviesData as MoviesData).movies;

  const handleNextWeek = () => {
    if (weekIndex < maxWeeks - 1) {
      setWeekIndex(weekIndex + 1);
    }
  };

  const handlePreviousWeek = () => {
    if (weekIndex > 0) {
      setWeekIndex(weekIndex - 1);
    }
  };

  // Fonction pour obtenir l'intervalle de dates de la semaine courante
  const getWeekDateRange = () => {
    const currentWeekMovies = moviesData;
    if (currentWeekMovies.length === 0) return "";

    const dates = currentWeekMovies.map(movie => new Date(movie.screening_date));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    const formatDate = (date: Date) =>
      date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

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
  const { movieDataFamille, movieLoadingFamille, movieErrorFamille } = useHomeMovieFamille(
    moviesDataFamille[0]?.id,
    moviesDataFamille[1]?.id,
    moviesDataFamille[2]?.id,
    moviesDataFamille[3]?.id
  );
  // Ajouter les dates de diffusion aux données des films
  const moviesWithScreenings = movieData?.map((movie, index) => ({
    ...movie,
    screening_date: moviesData[index]?.screening_date,
    hours: moviesData[index]?.hours
  }));
  const moviesWithScreeningsFamille = movieDataFamille?.map((movie, index) => ({
    ...movie,
    screening_date: moviesDataFamille[index]?.screening_date,
    hours: moviesDataFamille[index]?.hours
  }));
  return (
    <div className="relative px-6 space-y-10 md:px-0">

      <div className="space-y-24">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Heading>Programmation de la semaine ({getWeekDateRange()})</Heading>
            <div className="flex gap-2">
              <button
                onClick={handlePreviousWeek}
                disabled={weekIndex === 0}
                className={`px-4 py-2 rounded-md transition-colors ${weekIndex === 0
                    ? 'text-gray-500 bg-gray-200 cursor-not-allowed'
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                Semaine précédente
              </button>
              <button
                onClick={handleNextWeek}
                disabled={weekIndex >= maxWeeks - 1}
                className={`px-4 py-2 rounded-md transition-colors ${weekIndex >= maxWeeks - 1
                    ? 'text-gray-500 bg-gray-200 cursor-not-allowed'
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                Semaine suivante
              </button>
            </div>
          </div>

          {error && (
            <p className="opacity-50">
              Something went wrong! Please try again later.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-5">
            {movieLoading || movieError ? (
              <LoaderCard count={5} type="card-large" />
            ) : (
              moviesWithScreenings?.map((item) => (
                <FeaturedMoviedCard key={item?.id} movie={item} />
              ))
            )}
          </div>
        </section>
        <section className="space-y-6">
          <Heading>Programmation Famille</Heading>
          {error && (
            <p className="opacity-50">
              Something went wrong! Please try again later.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-4">
            {movieLoadingFamille || movieErrorFamille ? (
              <LoaderCard count={4} type="card-large" />
            ) : (
              moviesWithScreeningsFamille?.map((item) => (
                <FeaturedMoviedCard key={item?.id} movie={item} />
              ))
            )}
          </div>
        </section>
        <section
          className="flex flex-col items-start gap-6 p-16 text-white bg-center bg-cover rounded-md bg-brand-blue md:flex-row md:justify-between md:items-center"
          style={{
            backgroundImage: `url('/search-container-background.svg')`,
          }}
        >
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold">Recherche</h2>

            <p className="opacity-75">
              Rechercher votre film préféré, réalisateur ou acteur.
            </p>
          </div>

          <div className="w-full text-gray-100/40 md:w-3/6">
            <SearchInput />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
