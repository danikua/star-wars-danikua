import React, { useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { ICharacter, IFilm, IStarship } from "../interfaces"; // Importing interfaces for character, film, and starship data
import { NodeGenerator } from "./Nodes/NodeGenerator"; // Importing NodeGenerator to create nodes and edges based on character data

// Define the props interface for CharacterFlow
interface CharacterFlowProps {
  characters: ICharacter[];
  films: IFilm[];
  starships: IStarship[];
  currentPage: number;
}

// CharacterFlow component displays a flow chart of character-related nodes and edges
export const CharacterFlow: React.FC<CharacterFlowProps> = ({
  characters,
  films,
  starships,
  currentPage,
}) => {
  // State to manage nodes and edges in ReactFlow
  const [nodes, setNodes, onNodesChange] = useNodesState([]); // Manages nodes state
  const [edges, setLocalEdges] = useEdgesState([]); // Manages edges state

  // useEffect triggers on changes in characters, currentPage, films, or starships
  useEffect(() => {
    const startIndex = currentPage - 1; // Calculate starting index based on currentPage prop

    // Reset nodes and edges if no valid characters or out-of-bounds page
    if (!characters || startIndex < 0 || startIndex >= characters.length) {
      setNodes([]); // Reset nodes to empty
      setLocalEdges([]); // Reset edges to empty
      return;
    }

    const currentCharacter = characters[startIndex]; // Get the current character based on the page
    if (!currentCharacter) return; // Exit if no character found

    // Generate nodes and edges for the current character
    const { nodes: newNodes, edges: newEdges } = NodeGenerator({
      character: currentCharacter,
      films,
      starships,
    });

    // Update state with newly generated nodes and edges
    setNodes(newNodes);
    setLocalEdges(newEdges);
  }, [characters, currentPage, films, starships]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* ReactFlow component renders nodes and edges on a full-screen view */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        fitView // Automatically fits the view to include all nodes
        fitViewOptions={{ padding: 0.3 }} // Padding for fitView
      >
        <Background color="#000" gap={16} size={1} variant="dots" />{" "}
        {/* Adds a dotted background */}
        <Controls /> {/* Adds controls for zooming in and out */}
      </ReactFlow>
    </div>
  );
};
