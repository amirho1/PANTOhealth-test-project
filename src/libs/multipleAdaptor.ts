import type { AlwaysReturns } from "../hooks/useDataSummary";
import type { Data, multiData } from "../types";
import { isValidMultipleData } from "./helpers";

export type multipleNotNulls = [number, multiData][];

export interface MultipleAdaptorReturns extends AlwaysReturns {
  listOfMappedY: number[][];
  listOfMappedX: [number[], number[], number[]];
}

export default function multipleAdaptor(arr: Data): MultipleAdaptorReturns {
  const listOfMappedY: MultipleAdaptorReturns["listOfMappedY"] = [[], [], []];
  const listOfMappedX: MultipleAdaptorReturns["listOfMappedX"] = [[], [], []];

  let xMin = Infinity,
    xMax = -Infinity,
    yMin = Infinity,
    yMax = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (isValidMultipleData(current)) {
      const yArr = current[1];
      const xVal = current[0];

      current[1].forEach((num, j) => {
        if (num !== null && num !== undefined) {
          listOfMappedY[j].push(num);
          listOfMappedX[j].push(xVal);
        }
      });

      xMin = Math.min(xVal, xMin);
      xMax = Math.max(xVal, xMax);

      yArr.forEach(num => {
        if (num !== null && num !== undefined) {
          yMin = Math.min(num, yMin);
          yMax = Math.max(num, yMax);
        }
      });
    }
  }

  return { listOfMappedY, listOfMappedX, xMin, xMax, yMin, yMax };
}
