import { axisBottom, axisLeft, line, scaleLinear, select } from "d3";
import { useRef, useEffect } from "react";
import type { Data, singleData } from "../../types";
import useDataSummary from "../../hooks/useDataSummary";
interface Props {
  data: Data<singleData>;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  title: string;
}

export default function SingleLineChart({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
  title,
}: Props) {
  const gx = useRef(null);
  const gy = useRef(null);

  const { xMin, xMax, yMax, yMin, mappedY, notNulls } = useDataSummary(data, [data]);

  const x = scaleLinear([xMin, xMax], [marginLeft, width - marginRight]);

  const y = scaleLinear([yMin, yMax], [height - marginBottom, marginTop]);

  const lineCb = line((_, i) => x(notNulls[i][0]), y);

  useEffect(() => void select(gx.current).call(axisBottom(x) as any), [gx, x]);
  useEffect(() => void select(gy.current).call(axisLeft(y) as any), [gy, y]);

  const path = lineCb(mappedY);

  return (
    <div style={{ marginLeft: "10rem" }}>
      <h3>{title}</h3>
      <svg width={width} height={height}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
        {path && (
          <path fill="stroke" stroke="currentColor" strokeWidth="1.5" d={path} color="white" />
        )}
      </svg>
    </div>
  );
}
