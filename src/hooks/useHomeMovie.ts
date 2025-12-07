// Hooks
import useMovie from "./useMovie";

export const useHomeMovie = (movieIds: string[]) => {
  // Call useMovie for each ID - hooks must be called unconditionally
  // but we pass empty string when there's no movie at that index
  const movie0 = useMovie(movieIds[0] || '');
  const movie1 = useMovie(movieIds[1] || '');
  const movie2 = useMovie(movieIds[2] || '');
  const movie3 = useMovie(movieIds[3] || '');
  const movie4 = useMovie(movieIds[4] || '');

  // Collect all results
  const allResults = [movie0, movie1, movie2, movie3, movie4];
  
  // Filter only the results that correspond to valid movie IDs
  const validResults = allResults.slice(0, movieIds.length);

  return {
    movieLoading: validResults.some(result => result.loading),
    movieError: validResults.some(result => result.error),
    movieData: validResults.map(result => result.data),
  };
};

export default useHomeMovie;
