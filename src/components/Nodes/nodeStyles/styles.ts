export const nodeStyle = {
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  borderRadius: "16px",
  padding: "12px",
  textAlign: "center" as const,
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
  fontSize: "14px",
  backdropFilter: "blur(8px)",
} as const;

export const characterNodeStyle = {
  ...nodeStyle,
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 240, 255, 0.9))",
  minWidth: "220px",
  padding: "16px",
} as const;

export const filmNodeStyle = {
  ...nodeStyle,
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 240, 0.9))",
  width: "180px",
} as const;

export const starshipNodeStyle = {
  ...nodeStyle,
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 255, 240, 0.9))",
  width: "160px",
} as const;

export const edgeStyles = {
  stroke: "rgba(120, 120, 120, 0.3)",
  strokeWidth: 1,
  animated: true,
} as const;
