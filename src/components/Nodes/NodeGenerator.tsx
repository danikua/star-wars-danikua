import { Node, Edge } from "reactflow";
import { ICharacter, IFilm, IStarship } from "../../interfaces";
import { CharacterNode } from "./CharacterNode"; // Import character node component
import { FilmNode } from "./FilmNode"; // Import film node component
import { StarshipNode } from "./StarshipNode"; // Import starship node component
import {
  characterNodeStyle,
  filmNodeStyle,
  starshipNodeStyle,
  edgeStyles,
} from "./nodeStyles/styles"; // Import styles for nodes and edges

// Define the parameters required for node generation
interface GenerateNodesParams {
  character: ICharacter;
  films: IFilm[];
  starships: IStarship[];
}

// Define the result structure for generated nodes and edges
interface GenerateNodesResult {
  nodes: Node[];
  edges: Edge[];
}

// NodeGenerator function creates nodes and edges for character, film, and starship associations
export const NodeGenerator = ({
  character,
  films,
  starships,
}: GenerateNodesParams): GenerateNodesResult => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Constants for layout and positioning calculations
  const CENTER_X = 400;
  const CENTER_Y = 300;
  const FILM_RADIUS = 350; // Distance from center for film nodes
  const STARSHIP_RADIUS = 800; // Distance from center for starship nodes
  const ARC_SIZE = Math.PI / 4; // Angular spread for starships per film

  // Character Node
  const characterNode: Node = {
    id: character.url,
    type: "default",
    position: { x: CENTER_X, y: CENTER_Y }, // Position the character node at the center
    data: { label: <CharacterNode character={character} /> }, // Render character data in CharacterNode component
    style: characterNodeStyle, // Apply character-specific style
  };
  nodes.push(characterNode); // Add character node to nodes list

  // Generate Film and Starship Nodes
  if (character.films && character.films.length > 0) {
    character.films.forEach((filmId: number, index: number) => {
      // Calculate film node position in a circular layout around character node
      const angle =
        (2 * Math.PI * index) / character.films.length - Math.PI / 2;
      const filmTitle =
        films.find((f) => f.id === filmId)?.title || `Film ${filmId}`;

      // Add Film Node
      const filmNode: Node = {
        id: `film-${filmId}`,
        type: "default",
        position: {
          x: CENTER_X + FILM_RADIUS * Math.cos(angle),
          y: CENTER_Y + FILM_RADIUS * Math.sin(angle),
        },
        data: { label: <FilmNode id={filmId} title={filmTitle} /> }, // Render film data in FilmNode component
        style: filmNodeStyle, // Apply film-specific style
      };
      nodes.push(filmNode); // Add film node to nodes list

      // Add Film Edge linking character to film
      edges.push({
        id: `${character.url}-film-${filmId}`,
        source: character.url,
        target: `film-${filmId}`,
        type: "straight",
        style: edgeStyles, // Apply edge-specific style
      });

      // Generate Starship Nodes and Edges for each film
      const filmStarships = starships.filter((ship) =>
        ship.films.includes(filmId)
      );

      filmStarships.forEach((ship, shipIndex) => {
        // Calculate starship node position around film node
        const shipAngle =
          angle -
          ARC_SIZE / 2 +
          (ARC_SIZE * shipIndex) / (filmStarships.length - 1 || 1);

        // Add Starship Node
        const starshipNode: Node = {
          id: `starship-${ship.id}`,
          type: "default",
          position: {
            x: CENTER_X + STARSHIP_RADIUS * Math.cos(shipAngle),
            y: CENTER_Y + STARSHIP_RADIUS * Math.sin(shipAngle),
          },
          data: { label: <StarshipNode starship={ship} /> }, // Render starship data in StarshipNode component
          style: starshipNodeStyle, // Apply starship-specific style
        };
        nodes.push(starshipNode); // Add starship node to nodes list

        // Add Starship Edge linking film to starship
        edges.push({
          id: `film-${filmId}-starship-${ship.id}`,
          source: `film-${filmId}`,
          target: `starship-${ship.id}`,
          type: "straight",
          style: edgeStyles, // Apply edge-specific style
        });
      });
    });
  }

  return { nodes, edges }; // Return generated nodes and edges
};
