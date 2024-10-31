import { useState, useEffect } from "react";
import { fetchCharacters } from "../api/api";
import { ICharacter, ICharacterResponse } from "../interfaces";

export const useFetchCharacters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMoreCharacters = async () => {
    try {
      if (!hasMore) return;

      setLoading(true);
      const response: ICharacterResponse = await fetchCharacters(page);
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...response.results,
      ]);
      setHasMore(!!response.next);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError("Failed to fetch characters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreCharacters();
  }, [page]);

  return { characters, loading, error, loadMoreCharacters };
};
