import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoaging, setIsLoaging] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (...args) => {
    try {
      setIsLoaging(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoaging(false);
    }
  };
  return [fetching, isLoaging, error];
};
