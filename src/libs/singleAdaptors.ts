import type { AlwaysReturns } from "../hooks/useDataSummary";
import type { Data } from "../types";
import { checkIsSingle } from "./helpers";

export interface SingleAdaptorReturns {
  notNulls: [number, number][];
  mappedY: number[];
}

export default function singleAdaptor(arr: Data): SingleAdaptorReturns & AlwaysReturns {
  const notNulls: [number, number][] = [];
  const mappedY: number[] = [];
  let xMin = 0,
    xMax = 0,
    yMin = 0,
    yMax = 0;

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (checkIsSingle(current)) {
      notNulls.push(current);
      mappedY.push(current[1]);
      if (current[0] < xMin) xMin = current[0];
      if (current[0] > xMax) xMax = current[0];

      if (current[1] < yMin) yMin = current[1];
      if (current[1] > yMax) yMax = current[1];
    }
  }

  return { notNulls, mappedY, xMin, xMax, yMin, yMax };
}
