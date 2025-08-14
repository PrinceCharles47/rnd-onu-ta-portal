import { useEffect, useState } from "react";

export const useSearchDebounce = ({ value, delay }) => {
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return { debounce };
};
