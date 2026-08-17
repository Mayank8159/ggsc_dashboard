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
    <div className="card-glow rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{
          background: `linear-gradient(135deg, ${color}25, ${color}10)`,
          boxShadow: `0 0 20px ${color}15`,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-zinc-100 tabular-nums">{value}</p>
        <p className="text-sm text-zinc-500 truncate">{label}</p>
      </div>
    </div>
  );
}
