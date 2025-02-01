export const Type = Object.freeze({
  STRING: "STRING",
  NUMBER: "NUMBER",
  SHAPE: "SHAPE",
} as const);

export type InputOutputType = "STRING" | "NUMBER" | "SHAPE";

export const ShapeType = Object.freeze({
  CIRCLE: "circle",
  TRIANGLE: "triangle",
  RECTANGLE: "rectangle",
} as const);

export type ShapeType = "circle" | "triangle" | "rectangle";
