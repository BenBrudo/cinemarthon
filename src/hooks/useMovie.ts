import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

// Fetcher
const fetcher = <MovieInfo>(url: string) => axios.get<MovieInfo>(url).then((res) => res.data);

export const useMovie = (id: string) => {
  const [data, setData] = useState<MovieInfo>();
  const [error, setError] = useState(null);

  useSWR<MovieInfo>(`/api/getMovie?id=${id}`, fetcher, {
    onSuccess: setData,
    onError: (err) => setError(err.message),
  });
  console.log(error);
  console.log(data);
  return {
    loading: !error && !data,
    error,
    data,
  };
};

export default useMovie;
