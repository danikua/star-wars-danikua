import React from "react";
import { ICharacter } from "../../interfaces";

interface CharacterNodeProps {
  character: ICharacter;
}

export const CharacterNode: React.FC<CharacterNodeProps> = ({ character }) => (
  <div>
    <img
      src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
      alt={`${character.name}-iamge`}
      style={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
    <h3>{character.name || "Unknown Character"}</h3>
    <div>
      <p>Gender: {character.gender || "Unknown"}</p>
      <p>Height: {character.height || "Unknown"}</p>
      <p>Mass: {character.mass || "Unknown"}</p>
    </div>
  </div>
);
