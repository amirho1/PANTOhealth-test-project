import type { multiData } from "../types";

export function checkIsSingle(d: unknown): d is [number, number] {
  return (
    Array.isArray(d) &&
    d.length === 2 &&
    typeof d[0] === "number" &&
    typeof d[1] === "number" &&
    Number.isFinite(d[0]) &&
    Number.isFinite(d[1])
  );
}

export function isValidMultipleData(item: unknown): item is [number, multiData] {
  return (
    Array.isArray(item) &&
    typeof item[0] === "number" &&
    Array.isArray(item[1]) &&
    item[1].some(Boolean)
  );
}
