import React from "react";

interface FilmNodeProps {
  id: number;
  title: string;
}

export const FilmNode: React.FC<FilmNodeProps> = ({ id, title }) => (
  <div>
    <img
      src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`}
      alt={`${title}-iamge`}
      style={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
    <div>{title}</div>
  </div>
);
