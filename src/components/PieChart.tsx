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

  if (percent < 0.06) return null;
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
      fontSize={11}
      fontWeight={700}
      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
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
    <div className="card-glow rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={105}
            innerRadius={40}
            dataKey="value"
            stroke="#1a1b23"
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
                fillOpacity={0.9}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1b23",
              border: "1px solid #3f3f46",
              borderRadius: "10px",
              color: "#e4e4e7",
              fontSize: "12px",
              padding: "8px 12px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
            formatter={(value, name) => [`${value} applicants`, name]}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
            formatter={(value: string) => (
              <span style={{ color: "#a1a1aa", fontSize: "11px" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
