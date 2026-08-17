"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { PieLabelRenderProps } from "recharts";

interface PieChartProps {
  data: { name: string; value: number }[];
  title: string;
  colors?: string[];
}

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
];

const RADIAN = Math.PI / 180;

function renderCustomizedLabel(props: PieLabelRenderProps) {
  const cx = Number(props.cx) || 0;
  const cy = Number(props.cy) || 0;
  const midAngle = Number(props.midAngle) || 0;
  const innerRadius = Number(props.innerRadius) || 0;
  const outerRadius = Number(props.outerRadius) || 0;
  const percent = Number(props.percent) || 0;

  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function PieChartCard({
  data,
  title,
  colors = COLORS,
}: PieChartProps) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
                fillOpacity={0.85}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1b23",
              border: "1px solid #27272a",
              borderRadius: "8px",
              color: "#e4e4e7",
              fontSize: "13px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
            formatter={(value: string) => (
              <span style={{ color: "#a1a1aa" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
