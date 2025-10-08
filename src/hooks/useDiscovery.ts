import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

// Fetcher
const fetcher = <T>(url: string) => axios.get<T>(url).then((res) => res.data);

export const useDiscovery = () => {
  const [data, setData] = useState<DiscoveryResult[]>();
  const [error, setError] = useState(null);
  const router = useRouter();
  const basePath = router.basePath;

  useSWR<DiscoveryResult[]>(`${basePath}/api/getDiscovery?language=fr-FR`, fetcher, {
    onSuccess: setData,
    onError: (err) => setError(err.message),
  });
  return {
    loading: !error && !data,
    error,
    data,
  };
};

export default useDiscovery;
