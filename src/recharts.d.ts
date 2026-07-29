// Type declarations for recharts to fix React 18 compatibility
declare module 'recharts' {
  import { ComponentType, ReactNode } from 'react';

  interface PieProps {
    data?: any[];
    cx?: number | string;
    cy?: number | string;
    innerRadius?: number | string;
    outerRadius?: number | string;
    paddingAngle?: number;
    dataKey: string;
    children?: ReactNode;
    [key: string]: any;
  }

  interface CellProps {
    fill?: string;
    [key: string]: any;
  }

  interface TooltipProps {
    contentStyle?: React.CSSProperties;
    itemStyle?: React.CSSProperties;
    cursor?: React.CSSProperties | boolean;
    [key: string]: any;
  }

  interface LegendProps {
    wrapperStyle?: React.CSSProperties;
    [key: string]: any;
  }

  interface XAxisProps {
    type?: 'number' | 'category';
    domain?: any[];
    tick?: any;
    dataKey?: string;
    [key: string]: any;
  }

  interface YAxisProps {
    type?: 'number' | 'category';
    dataKey?: string;
    tick?: any;
    width?: number;
    [key: string]: any;
  }

  interface BarProps {
    dataKey: string;
    radius?: number | number[];
    fill?: string;
    children?: ReactNode;
    [key: string]: any;
  }

  interface BarChartProps {
    data?: any[];
    layout?: 'horizontal' | 'vertical';
    children?: ReactNode;
    [key: string]: any;
  }

  interface PieChartProps {
    children?: ReactNode;
    [key: string]: any;
  }

  interface ResponsiveContainerProps {
    width?: number | string;
    height?: number | string;
    children?: ReactNode;
    [key: string]: any;
  }

  export const Pie: ComponentType<PieProps>;
  export const Cell: ComponentType<CellProps>;
  export const Tooltip: ComponentType<TooltipProps>;
  export const Legend: ComponentType<LegendProps>;
  export const XAxis: ComponentType<XAxisProps>;
  export const YAxis: ComponentType<YAxisProps>;
  export const Bar: ComponentType<BarProps>;
  export const BarChart: ComponentType<BarChartProps>;
  export const PieChart: ComponentType<PieChartProps>;
  export const ResponsiveContainer: ComponentType<ResponsiveContainerProps>;
}
