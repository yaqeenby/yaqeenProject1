export class ChartColor {
  type: 'color' | 'linear' | 'radial';
  stops: { start: number, color: string }[];
  color?: string;
}
