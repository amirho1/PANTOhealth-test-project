
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
