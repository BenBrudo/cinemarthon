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

  // Only fetch if id is not empty
  useSWR<MovieInfo>(id ? `${basePath}/api/getMovie?id=${id}` : null, fetcher, {
    onSuccess: setData,
    onError: (err) => setError(err.message),
  });
  return {
    loading: !error && !data && !!id,
    error,
    data,
  };
};

export default useMovie;
