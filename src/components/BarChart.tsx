"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartProps {
  data: { name: string; value: number }[];
  title: string;
  colors?: string[];
  layout?: "horizontal" | "vertical";
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

export default function BarChartCard({
  data,
  title,
  colors = COLORS,
  layout = "vertical",
}: ChartProps) {
  const isVertical = layout === "vertical";
  const maxNameLen = Math.max(...data.map((d) => d.name.length));
  const margin = isVertical
    ? { top: 5, right: 30, left: Math.min(maxNameLen * 8, 200), bottom: 5 }
    : { top: 5, right: 30, left: 20, bottom: 60 };

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={data.length * 36 + 60}>
        <BarChart
          data={data}
          layout={isVertical ? "vertical" : "horizontal"}
          margin={margin}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          {isVertical ? (
            <>
              <XAxis type="number" tick={{ fill: "#71717a", fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                width={Math.min(maxNameLen * 8, 180)}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="name"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                angle={-35}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} />
            </>
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1b23",
              border: "1px solid #27272a",
              borderRadius: "8px",
              color: "#e4e4e7",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
