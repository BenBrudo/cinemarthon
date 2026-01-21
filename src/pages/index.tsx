// Types
import type { NextPage } from "next";
import type { MoviesData } from "../types/movies-config";

// React
import { useState, useMemo, useRef } from "react";

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
  const [showProgramMenu, setShowProgramMenu] = useState(false);
  
  // Refs for swipe detection
  const movieListRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const scrollStartX = useRef<number>(0);

  // Constants for swipe navigation
  const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels
  const SCROLL_DELAY = 100; // Delay before scrolling after navigation
  const SCROLL_TOLERANCE = 1; // Tolerance for edge detection

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

  // Touch event handlers for swipe detection
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    if (movieListRef.current) {
      scrollStartX.current = movieListRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!movieListRef.current) return;

    const container = movieListRef.current;
    const swipeDistance = touchStartX.current - touchEndX.current;

    // Check if user scrolled to the edge
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const atStart = scrollLeft === 0;
    const atEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) < SCROLL_TOLERANCE;

    // Swipe left (move finger left = swipe left) at the end of the list
    if (swipeDistance > SWIPE_THRESHOLD && atEnd) {
      handleNext();
      // Scroll to the start of the new page (first item)
      setTimeout(() => {
        if (movieListRef.current) {
          movieListRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, SCROLL_DELAY);
    }
    // Swipe right (move finger right = swipe right) at the beginning of the list
    else if (swipeDistance < -SWIPE_THRESHOLD && atStart) {
      handlePrevious();
      // Scroll to the end of the new page (last item)
      setTimeout(() => {
        if (movieListRef.current) {
          const scrollWidth = movieListRef.current.scrollWidth;
          const clientWidth = movieListRef.current.clientWidth;
          movieListRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
        }
      }, SCROLL_DELAY);
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
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
    moviesData.map(movie => movie.id)
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
              <div className="relative">
                <button
                  onClick={() => setShowProgramMenu(!showProgramMenu)}
                  className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  title="Télécharger un programme"
                  aria-label="Télécharger un programme"
                  aria-expanded={showProgramMenu}
                  aria-haspopup="true"
                >
                  <Download className="w-6 h-6" />
                </button>
                {showProgramMenu && (
                  <div 
                    className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200"
                    role="menu"
                    aria-label="Sélection du programme"
                  >
                    <a
                      href="/cinema/Programmation_famille.png"
                      download="Programme-Famille.png"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                      onClick={() => setShowProgramMenu(false)}
                      role="menuitem"
                    >
                      Programme Famille
                    </a>
                    <a
                      href="/cinema/Programmation.pdf"
                      download="Programmation.pdf"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
                      onClick={() => setShowProgramMenu(false)}
                      role="menuitem"
                    >
                      Programme Classique
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <p className="opacity-50">
              Something went wrong! Please try again later.
            </p>
          )}
          <div 
            ref={movieListRef}
            className="flex gap-6 overflow-x-auto md:overflow-visible md:grid md:grid-cols-5 snap-x snap-mandatory md:py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {movieLoading || movieError ? (
              <LoaderCard count={5} type="card-large" />
            ) : (
              moviesWithScreenings?.map((item) => (
                <div key={item?.id} className="flex-shrink-0 w-full snap-start md:w-auto group">
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
