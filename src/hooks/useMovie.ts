import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from 'next/router';

// Fetcher
const fetcher = <MovieInfo>(url: string) => axios.get<MovieInfo>(url).then((res) => res.data);

export const useMovie = (id: string) => {
  const [data, setData] = useState<MovieInfo>();
  const [error, setError] = useState(null);
  const router = useRouter();
  const basePath = router.basePath;

  // Ne faire l'appel API que si l'ID est défini et non vide
  const shouldFetch = id && id.trim() !== '';
  
  useSWR<MovieInfo>(
    shouldFetch ? `${basePath}/api/getMovie?id=${id}` : null,
    fetcher,
    {
      onSuccess: setData,
      onError: (err) => setError(err.message),
    }
  );
  return {
    loading: shouldFetch && !error && !data,
    error,
    data,
  };
};

export default useMovie;
