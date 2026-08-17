"use client";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: string;
  color?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  color = "#6366f1",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 flex items-center gap-4 hover:border-[color:var(--accent)] transition-colors">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-zinc-100">{value}</p>
        <p className="text-sm text-zinc-500">{label}</p>
      </div>
    </div>
  );
}
