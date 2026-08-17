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
  LabelList,
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

function truncateLabel(name: string, maxLen: number) {
  return name.length > maxLen ? name.slice(0, maxLen) + "..." : name;
}

export default function BarChartCard({
  data,
  title,
  colors = COLORS,
  layout = "vertical",
}: ChartProps) {
  const isVertical = layout === "vertical";
  const maxNameLen = Math.max(...data.map((d) => d.name.length), 10);
  const chartHeight = isVertical
    ? Math.max(data.length * 32 + 40, 200)
    : 300;

  const truncatedData = data.map((d) => ({
    ...d,
    label: truncateLabel(d.name, 25),
  }));

  return (
    <div className="card-glow rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={truncatedData}
          layout={isVertical ? "vertical" : "horizontal"}
          margin={
            isVertical
              ? { top: 5, right: 40, left: 10, bottom: 5 }
              : { top: 5, right: 20, left: 20, bottom: 70 }
          }
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={isVertical} vertical={!isVertical} />
          {isVertical ? (
            <>
              <XAxis type="number" tick={{ fill: "#52525b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                width={Math.min(maxNameLen * 6.5, 170)}
                axisLine={false}
                tickLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="label"
                tick={{ fill: "#a1a1aa", fontSize: 10 }}
                angle={-40}
                textAnchor="end"
                height={80}
                interval={0}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fill: "#52525b", fontSize: 11 }} axisLine={false} tickLine={false} />
            </>
          )}
          <Tooltip
            cursor={{ fill: "rgba(99,102,241,0.06)" }}
            contentStyle={{
              backgroundColor: "#1a1b23",
              border: "1px solid #3f3f46",
              borderRadius: "10px",
              color: "#e4e4e7",
              fontSize: "12px",
              padding: "8px 12px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
            formatter={(value, _name, props) => [String(value), (props?.payload as { name?: string })?.name || "Count"]}
          />
          <Bar dataKey="value" radius={isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]} barSize={18}>
            {truncatedData.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="value"
              position={isVertical ? "right" : "top"}
              style={{ fill: "#a1a1aa", fontSize: 11, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
