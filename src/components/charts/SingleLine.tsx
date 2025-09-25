import { line } from "d3";
import Line, { type ComponentProps } from "./Line";
import type { HTMLAttributes } from "react";
import singleAdaptor from "../../libs/singleAdaptors";

function Chart({
  notNulls,
  mappedY,
  x,
  y,
  ...props
}: HTMLAttributes<SVGPathElement> & ComponentProps) {
  const lineCb = line((_, i) => x(notNulls[i][0]), y);
  const path = lineCb(mappedY);

  return (
    path && (
      <path
        fill="stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        d={path}
        color="white"
        {...props}
      />
    )
  );
}

export const SingleLine = Line(Chart, singleAdaptor);
