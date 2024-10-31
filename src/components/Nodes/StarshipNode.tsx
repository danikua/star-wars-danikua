import React, { useState } from "react";
import { IStarship } from "../../interfaces";

interface StarshipNodeProps {
  starship: IStarship;
}

export const StarshipNode: React.FC<StarshipNodeProps> = ({ starship }) => {
  const [imgSrc, setImgSrc] = useState(
    `https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`
  );

  const handleError = () => {
    setImgSrc("/img/no-image.png");
  };

  return (
    <div>
      <img
        src={imgSrc}
        alt={`${starship.name}-image`}
        onError={handleError}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div>{starship.name}</div>
      <div>{starship.model}</div>
    </div>
  );
};
