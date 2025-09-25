import { useEffect, useRef, type ComponentType } from "react";
import type { Data, multiData, singleData } from "../../types";
import useDataSummary, { type Adaptor } from "../../hooks/useDataSummary";
import { axisBottom, axisLeft, scaleLinear, select, type ScaleLinear } from "d3";

interface LineProps<ValueType extends singleData | multiData> {
  data: Data<ValueType>;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  title: string;
}

export interface ComponentProps<ValueType extends singleData | multiData> {
  x: ScaleLinear<number, number, never>;
  y: ScaleLinear<number, number, never>;
  mappedY: number[];
  notNulls: [number, ValueType][];
}

export default function Line<
  PropsT extends Record<string, any>,
  AdaptorReturns extends Record<string, any>,
  ValueType extends singleData | multiData
>(
  Component: ComponentType<ComponentProps<ValueType> & PropsT & any>,
  adaptor: Adaptor<AdaptorReturns>
) {
  return function EnhanceComp({
    data,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40,
    title,
    ...props
  }: LineProps<ValueType> & PropsT) {
    const gx = useRef(null);
    const gy = useRef(null);

    const { xMin, xMax, yMax, yMin, ...dataSummaryRest } = useDataSummary<
      AdaptorReturns,
      ValueType
    >(data, adaptor, [data]);

    const x = scaleLinear([xMin, xMax], [marginLeft, width - marginRight]);

    const y = scaleLinear([yMin, yMax], [height - marginBottom, marginTop]);

    useEffect(() => void select(gx.current).call(axisBottom(x) as any), [gx, x]);
    useEffect(() => void select(gy.current).call(axisLeft(y) as any), [gy, y]);

    return (
      <div>
        <h3>{title}</h3>
        <svg width={width} height={height}>
          <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
          <g ref={gy} transform={`translate(${marginLeft},0)`} />
          <Component x={x} y={y} {...dataSummaryRest} {...props} />
        </svg>
      </div>
    );
  };
}
