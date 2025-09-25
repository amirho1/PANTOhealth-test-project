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

  let xMin = Infinity,
    xMax = -Infinity,
    yMin = Infinity,
    yMax = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (checkIsSingle(current)) {
      const xVal = current[0];
      const yVal = current[1];

      notNulls.push(current);
      mappedY.push(yVal);
      if (xVal < xMin) xMin = xVal;
      if (xVal > xMax) xMax = xVal;

      if (yVal < yMin) yMin = yVal;
      if (yVal > yMax) yMax = yVal;
    }
  }

  return { notNulls, mappedY, xMin, xMax, yMin, yMax };
}
