import { useEffect, useState } from "react";
export default function UseFetch(url) {
  const [data, setData] = useState(null);
  const [ispending, setIspending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIspending(true);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setIspending(false);
        setData(json);
        setError(null);
      } catch (Err) {
        setError("could not fetch data");
        setIspending(false);
        console.log(Err.message);
      }
    };
    fetchData();
    return () => {
      controller.abort;
    };
  }, [url]);

  return { data, ispending, error };
}
