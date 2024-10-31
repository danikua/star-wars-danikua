import { useEffect, useState } from "react";
import { fetchFilms } from "../api/api";
import { IFilm, IFilmResponse } from "../interfaces";

export const useFetchFilms = () => {
  const [films, setFilms] = useState<IFilm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response: IFilmResponse = await fetchFilms();
        setFilms(response.results);
      } catch (err) {
        setError("Failed to fetch films.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { films, loading, error };
};
