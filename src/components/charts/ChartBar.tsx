/**
 * ChartBar.tsx — minimal dark bar chart using Recharts
 *
 * No 'use client' directive — handled by client:load in MDX:
 *
 * @usage
 * ```mdx
 * import ChartBar from '../components/charts/ChartBar';
 *
 * export const data = [
 *   { tool: 'DuckDB',  ms: 120 },
 *   { tool: 'Polars',  ms: 95  },
 *   { tool: 'Pandas',  ms: 740 },
 * ];
 *
 * <ChartBar client:load data={data} xKey="tool" yKey="ms" />
 *
 * <!-- Custom accent color -->
 * <ChartBar client:load data={data} xKey="tool" yKey="ms" color="#38bdf8" />
 * ```
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartBarProps {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  color?: string;
}

const GRID_COLOR = 'rgba(255, 255, 255, 0.05)';
const AXIS_STYLE = {
  fontFamily: 'var(--font-inter, Inter, sans-serif)',
  fontSize: 12,
  fill: 'rgba(229, 231, 235, 0.5)',
};
const TOOLTIP_STYLE: React.CSSProperties = {
  background: '#0a0a0a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 0,
  fontSize: 13,
  fontFamily: 'var(--font-inter, Inter, sans-serif)',
  color: '#e5e7eb',
};

export default function ChartBar({
  data,
  xKey,
  yKey,
  color = '#ffffff',
}: ChartBarProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
        barCategoryGap="30%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_COLOR}
          vertical={false}
        />
        <XAxis
          dataKey={xKey}
          tick={AXIS_STYLE}
          axisLine={{ stroke: GRID_COLOR }}
          tickLine={false}
        />
        <YAxis
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          itemStyle={{ color: '#e5e7eb' }}
          labelStyle={{ color: 'rgba(229,231,235,0.5)', marginBottom: 4 }}
        />
        <Bar
          dataKey={yKey}
          fill={color}
          opacity={0.8}
          radius={0}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
