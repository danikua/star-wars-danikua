import { NodeGenerator } from "../../components/Nodes/NodeGenerator";
import { ICharacter, IFilm, IStarship } from "../../interfaces";

// Mock Data - Test data
const mockCharacter: ICharacter = {
  url: "character-1",
  name: "Character 1",
  films: [1, 2],
};

const mockFilms: IFilm[] = [
  { id: 1, title: "Film 1" },
  { id: 2, title: "Film 2" },
];

const mockStarships: IStarship[] = [
  { id: 1, name: "Starship 1", films: [1] },
  { id: 2, name: "Starship 2", films: [2] },
];

describe("NodeGenerator function", () => {
  // Constants from NodeGenerator to sync with main code
  const CENTER_X = 400;
  const CENTER_Y = 300;
  const FILM_RADIUS = 350; // Must match the radius in NodeGenerator

  it("should generate a character node at the center", () => {
    const { nodes } = NodeGenerator({
      character: mockCharacter,
      films: mockFilms,
      starships: mockStarships,
    });

    // Check that character node is created and located at the center
    const characterNode = nodes.find((node) => node.id === mockCharacter.url);
    expect(characterNode).toBeDefined();
    expect(characterNode?.position).toEqual({ x: CENTER_X, y: CENTER_Y });
  });

  it("should generate film nodes in a circular layout", () => {
    const { nodes } = NodeGenerator({
      character: mockCharacter,
      films: mockFilms,
      starships: mockStarships,
    });

    // Filter film nodes
    const filmNodes = nodes.filter((node) => node.id.startsWith("film-"));
    expect(filmNodes).toHaveLength(mockCharacter.films.length);

    // Check position of each film node
    filmNodes.forEach((filmNode, index) => {
      // Calculate expected position the same way as in NodeGenerator
      const expectedAngle =
        (2 * Math.PI * index) / mockCharacter.films.length - Math.PI / 2;
      const expectedX = CENTER_X + FILM_RADIUS * Math.cos(expectedAngle);
      const expectedY = CENTER_Y + FILM_RADIUS * Math.sin(expectedAngle);

      // Check with small margin of error due to floating point number rounding
      expect(filmNode.position.x).toBeCloseTo(expectedX, 0);
      expect(filmNode.position.y).toBeCloseTo(expectedY, 0);
    });
  });

  it("should generate starship nodes connected to film nodes", () => {
    const { nodes, edges } = NodeGenerator({
      character: mockCharacter,
      films: mockFilms,
      starships: mockStarships,
    });

    // Check creation of starship nodes
    const starshipNodes = nodes.filter((node) =>
      node.id.startsWith("starship-")
    );
    expect(starshipNodes).toHaveLength(mockStarships.length);

    // Check connections between starships and films
    starshipNodes.forEach((starshipNode) => {
      const starship = mockStarships.find(
        (ship) => `starship-${ship.id}` === starshipNode.id
      );
      const filmId = starship?.films[0];
      expect(filmId).toBeDefined();

      // Check for connection existence
      const filmNodeId = `film-${filmId}`;
      const edge = edges.find(
        (e) => e.source === filmNodeId && e.target === starshipNode.id
      );
      expect(edge).toBeDefined();
    });
  });

  it("should handle empty data by returning no nodes or edges", () => {
    const { nodes, edges } = NodeGenerator({
      character: { url: "character-1", name: "Character 1", films: [] },
      films: [],
      starships: [],
    });
    expect(nodes).toHaveLength(1); // Only character node
    expect(edges).toHaveLength(0);
  });

  it("should generate multiple starships for a single film", () => {
    const { nodes, edges } = NodeGenerator({
      character: { ...mockCharacter, films: [1] },
      films: [mockFilms[0]],
      starships: [
        { id: 1, name: "Starship 1", films: [1] },
        { id: 2, name: "Starship 2", films: [1] },
      ],
    });

    const starshipNodes = nodes.filter((node) =>
      node.id.startsWith("starship-")
    );
    expect(starshipNodes).toHaveLength(2);

    starshipNodes.forEach((starshipNode) => {
      const edge = edges.find(
        (e) => e.source === "film-1" && e.target === starshipNode.id
      );
      expect(edge).toBeDefined();
    });
  });

  it("should generate a film node without starships and only connect it to the character", () => {
    const { nodes, edges } = NodeGenerator({
      character: { ...mockCharacter, films: [1] },
      films: [mockFilms[0]],
      starships: [],
    });

    const filmNode = nodes.find((node) => node.id === "film-1");
    expect(filmNode).toBeDefined();

    const characterToFilmEdge = edges.find(
      (e) => e.source === "character-1" && e.target === "film-1"
    );
    expect(characterToFilmEdge).toBeDefined();
    expect(edges).toHaveLength(1); // Only one edge from character to film
  });

  it("should generate multiple film nodes connected to the character and no starships", () => {
    const { nodes, edges } = NodeGenerator({
      character: { ...mockCharacter, films: [1, 2] },
      films: mockFilms,
      starships: [],
    });

    const filmNodes = nodes.filter((node) => node.id.startsWith("film-"));
    expect(filmNodes).toHaveLength(2);

    filmNodes.forEach((filmNode) => {
      const edge = edges.find(
        (e) => e.source === "character-1" && e.target === filmNode.id
      );
      expect(edge).toBeDefined();
    });

    expect(edges).toHaveLength(2); // One edge per film to character
  });
});
