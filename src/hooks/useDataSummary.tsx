import { useMemo } from "react";
import type { Data } from "../types";

export type AlwaysReturns = {
  notNulls: [number, number][];
  mappedY: number[];
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export type Adaptor<Returns extends Record<string, any>> = (arr: Data) => Returns & AlwaysReturns;

export default function useDataSummary<Returns extends Record<string, any>>(
  arr: Data,
  adaptor: Adaptor<Returns>,
  dependencies: any[] = []
): AlwaysReturns {
  const result = useMemo(() => adaptor(arr), dependencies);

  return result;
}
