/**
 * ChartLine.tsx — minimal dark line chart using Recharts
 *
 * No 'use client' directive — handled by client:load in MDX:
 *
 * @usage
 * ```mdx
 * import ChartLine from '../components/charts/ChartLine';
 *
 * export const data = [
 *   { month: 'Jan', requests: 1200 },
 *   { month: 'Feb', requests: 2400 },
 *   { month: 'Mar', requests: 1800 },
 * ];
 *
 * <ChartLine client:load data={data} xKey="month" yKey="requests" />
 *
 * <!-- Custom color -->
 * <ChartLine client:load data={data} xKey="month" yKey="requests" color="#a3e635" />
 * ```
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartLineProps {
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

export default function ChartLine({
  data,
  xKey,
  yKey,
  color = '#ffffff',
}: ChartLineProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart
        data={data}
        margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
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
          cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
          itemStyle={{ color: '#e5e7eb' }}
          labelStyle={{ color: 'rgba(229,231,235,0.5)', marginBottom: 4 }}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
