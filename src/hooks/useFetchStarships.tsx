import { useState, useEffect } from "react";
import { fetchAllStarships } from "../api/api";
import { IStarship } from "../interfaces";

interface UseFetchStarshipsReturn {
  starships: IStarship[];
  allStarships: IStarship[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  goToPage: (newPage: number) => void;
}

export const useFetchStarships = (): UseFetchStarshipsReturn => {
  const [starships, setStarships] = useState<IStarship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const itemsPerPage = 10;

  const getPaginatedStarships = (): IStarship[] => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return starships.slice(start, end);
  };

  const loadStarships = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await fetchAllStarships();
      setStarships(data);
      setHasMore(data.length > itemsPerPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (newPage: number): void => {
    const maxPage = Math.ceil(starships.length / itemsPerPage);
    if (newPage >= 1 && newPage <= maxPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    loadStarships();
  }, []);

  return {
    starships: getPaginatedStarships(),
    allStarships: starships,
    loading,
    error,
    hasMore,
    currentPage: page,
    totalPages: Math.ceil(starships.length / itemsPerPage),
    goToPage,
  };
};
