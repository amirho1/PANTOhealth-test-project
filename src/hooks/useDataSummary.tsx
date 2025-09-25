import { useMemo } from "react";
import type { Data, multiData, singleData } from "../types";

export type AlwaysReturns = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export type Adaptor<Returns extends Record<string, any>> = (arr: Data) => Returns & AlwaysReturns;

export default function useDataSummary<
  Returns extends Record<string, any>,
  ValueType extends singleData | multiData
>(arr: Data<ValueType>, adaptor: Adaptor<Returns>, dependencies: any[] = []): AlwaysReturns {
  const result = useMemo(() => adaptor(arr), dependencies);

  return result;
}
