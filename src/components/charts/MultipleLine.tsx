import { line } from "d3";
import multipleAdaptor, { type MultipleAdaptorReturns } from "../../libs/multipleAdaptor";
import Line, { type ComponentProps } from "./Line";
import type { multiData } from "../../types";

const colors = ["blue", "green", "red"];

function MultiPath({
  listOfMappedY,
  listOfMappedX,
  x,
  y,
}: MultipleAdaptorReturns & ComponentProps<multiData>) {
  const lineCallBacks = listOfMappedX.map(numbers => {
    return line((_, i) => {
      return x(numbers[i]);
    }, y);
  });

  const paths = lineCallBacks.map((lineCB, i) => {
    return lineCB(listOfMappedY[i]);
  });

  const pathElements = paths.map(
    (path, i) =>
      path && (
        <path
          key={i}
          fill="stroke"
          stroke="currentColor"
          strokeWidth="1"
          d={path}
          color={colors[i]}
        />
      )
  );

  return <>{pathElements}</>;
}

export const MultipleLine = Line<Record<string, any>, MultipleAdaptorReturns, multiData>(
  MultiPath,
  multipleAdaptor
);
