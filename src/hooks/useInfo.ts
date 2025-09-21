import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

// Fetcher
const fetcher = <T>(url: string) => axios.get<T>(url).then((res) => res.data);

export const useInfo = <T>(movieId: string, type: "movie" | "tv" = "movie") => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState(null);
  const router = useRouter();
  const basePath = router.basePath;

  useSWR<T>(`${basePath}/api/getInfo?type=${type}&id=${movieId}`, fetcher, {
    onSuccess: setData,
    onError: (err) => setError(err.message),
  });

  return {
    loading: !error && !data,
    error,
    data,
  };
};

export default useInfo;
