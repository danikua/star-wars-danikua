import React from "react";
import { useFetchCharacters } from "../hooks/useFetchCharacters";
import { CharacterCard } from "./CharacterCard";
import CircularIndeterminate from "./Loader";

const CharactersList = () => {
  const { loading, error } = useFetchCharacters();

  if (loading) return <CircularIndeterminate />;
  if (error) return <p>Error: {error}</p>;

  return <CharacterCard />;
};

export default CharactersList;
