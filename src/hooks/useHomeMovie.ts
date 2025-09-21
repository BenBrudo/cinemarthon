// Hooks
import useMovie from "./useMovie";

export const useHomeMovie = (idOne: string, idTwo: string, idThree: string, idFour: string) => {
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

  return {
    movieLoading: movieOneLoading || movieTwoLoading || movieThreeLoading || movieFourLoading,
    movieError: movieOneError || movieTwoError || movieThreeError || movieFourError,
    movieData: [movieOne, movieTwo, movieThree, movieFour],
  };
};

export default useHomeMovie;
