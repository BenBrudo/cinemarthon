// Hooks
import useMovie from "./useMovie";

export const useHomeMovie = (idOne: string = '', idTwo: string = '', idThree: string = '', idFour: string = '', idFive: string = '') => {
  const {
    data: movieOne,
    loading: movieOneLoading,
    error: movieOneError,
  } = useMovie(idOne);

  const {
    data: movieTwo,
    loading: movieTwoLoading,
    error: movieTwoError,
  } = useMovie(idTwo);

  const {
    data: movieThree,
    loading: movieThreeLoading,
    error: movieThreeError,
  } = useMovie(idThree);

  const {
    data: movieFour,
    loading: movieFourLoading,
    error: movieFourError,
  } = useMovie(idFour);

  const {
    data: movieFive,
    loading: movieFiveLoading,
    error: movieFiveError,
  } = useMovie(idFive);

  return {
    movieLoading: movieOneLoading || movieTwoLoading || movieThreeLoading || movieFourLoading || movieFiveLoading,
    movieError: movieOneError || movieTwoError || movieThreeError || movieFourError || movieFiveError,
    movieData: [movieOne, movieTwo, movieThree, movieFour, movieFive],
  };
};

export default useHomeMovie;
