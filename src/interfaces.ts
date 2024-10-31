export interface ICharacter {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: number;
  films: number[];
  species: number[];
  vehicles: number[];
  starships: number[];
  created: string;
  edited: string;
  url: string;
}
export interface ICharacterResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICharacter[];
}

export interface IFilm {
  id: number;
  title: string;
  episode_id: number;
}
export interface IFilmResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IFilm[];
}
export interface IStarship {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  films: number[];
  pilots: number[];
  url: string;
}

export interface IStarshipResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IStarship[];
}

export interface NodeStyles {
  background: string;
  border: string;
  borderRadius: string;
  padding: string;
  textAlign: "center";
  boxShadow: string;
  fontSize: string;
  backdropFilter: string;
  width?: string;
  minWidth?: string;
}
export interface Position {
  x: number;
  y: number;
}
