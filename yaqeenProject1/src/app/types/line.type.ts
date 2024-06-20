import { ChartColor } from "./chartColor.type";
import { ChartShadow } from "./chartShadow.type";
import { Point } from "./point.type";

export class Line {
  label?: string;
  points: Point[];
  color?: ChartColor;
  shadow?: ChartShadow;
}

