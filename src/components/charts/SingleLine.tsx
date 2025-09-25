import { line } from "d3";
import Line, { type ComponentProps } from "./Line";
import type { HTMLAttributes } from "react";
import singleAdaptor, { type SingleAdaptorReturns } from "../../libs/singleAdaptors";
import type { singleData } from "../../types";

function Chart({
  notNulls,
  mappedY,
  x,
  y,
  ...props
}: HTMLAttributes<SVGPathElement> & ComponentProps<singleData>) {
  const lineCb = line((_, i) => x(notNulls[i][0]), y);
  const path = lineCb(mappedY);

  return (
    path && (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        d={path}
        color="white"
        {...props}
      />
    )
  );
}

export const SingleLine = Line<HTMLAttributes<SVGPathElement>, SingleAdaptorReturns, singleData>(
  Chart,
  singleAdaptor
);
