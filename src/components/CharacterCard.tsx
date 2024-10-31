import { useState } from "react";
import { useFetchCharacters } from "../hooks/useFetchCharacters";
import { useFetchFilms } from "../hooks/useFetchFilms";
import { useFetchStarships } from "../hooks/useFetchStarships";
import { CharacterFlow } from "./CharacterFlow";
import { PaginationComponent } from "./PaginationComponent";

export const CharacterCard = () => {
  const { characters } = useFetchCharacters();
  const { films } = useFetchFilms();
  const { allStarships: starships } = useFetchStarships();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <CharacterFlow
        characters={characters}
        films={films}
        starships={starships}
        currentPage={currentPage}
      />
      <PaginationComponent
        count={Math.ceil(characters.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
