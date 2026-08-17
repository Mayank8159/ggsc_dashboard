import { getAnalytics, rawData } from "@/lib/data";
import StatCard from "@/components/StatCard";
import BarChartCard from "@/components/BarChart";
import PieChartCard from "@/components/PieChart";
import ApplicantsTable from "@/components/ApplicantsTable";

export default function Home() {
  const analytics = getAnalytics(rawData);

  const committedCount = rawData.filter(
    (d) => d.willingToParticipate.toLowerCase().includes("fully committed")
  ).length;
  const whatsappCount = rawData.filter(
    (d) => d.joinedWhatsApp.toLowerCase().includes("yes")
  ).length;
  const uniqueUniversities = new Set(rawData.map((d) => d.university)).size;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--card-border)] bg-[var(--card-bg)]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-bold text-lg">
              G
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-100">
                GGSC Recruitment Dashboard
              </h1>
              <p className="text-xs text-zinc-500">Drive 2026 - Response Analytics</p>
            </div>
          </div>
          <div className="text-xs text-zinc-600 bg-[var(--card-bg)] border border-[var(--card-border)] px-3 py-1.5 rounded-lg">
            {analytics.total} Total Responses
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Applicants"
            value={analytics.total}
            icon="👥"
            color="#6366f1"
          />
          <StatCard
            label="Universities"
            value={uniqueUniversities}
            icon="🏛"
            color="#8b5cf6"
          />
          <StatCard
            label="Fully Committed"
            value={committedCount}
            icon="✅"
            color="#22c55e"
          />
          <StatCard
            label="Joined WhatsApp"
            value={whatsappCount}
            icon="💬"
            color="#14b8a6"
          />
        </section>

        {/* Charts Row 1: Domains & Year Distribution */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartCard
            data={analytics.domainCounts}
            title="Domain Preferences"
            layout="vertical"
          />
          <PieChartCard
            data={analytics.yearCounts}
            title="Year of Study Distribution"
          />
        </section>

        {/* Charts Row 2: Universities & Departments */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartCard
            data={analytics.universityCounts}
            title="Top Universities"
            layout="vertical"
            colors={["#3b82f6", "#06b6d4", "#14b8a6", "#22c55e", "#84cc16", "#eab308", "#f97316", "#f43f5e"]}
          />
          <BarChartCard
            data={analytics.departmentCounts}
            title="Department Distribution"
            layout="vertical"
            colors={["#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e"]}
          />
        </section>

        {/* Charts Row 3: Participation, WhatsApp, Source, Experience */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PieChartCard
            data={analytics.participationCounts}
            title="Commitment Level"
            colors={["#22c55e", "#f59e0b", "#ef4444"]}
          />
          <PieChartCard
            data={analytics.whatsappCounts}
            title="WhatsApp Group Status"
            colors={["#22c55e", "#ef4444", "#6366f1"]}
          />
          <PieChartCard
            data={analytics.experienceCounts}
            title="Prior Experience"
            colors={["#6366f1", "#a1a1aa"]}
          />
          <BarChartCard
            data={analytics.heardCounts}
            title="How They Heard About GGSC"
            layout="vertical"
            colors={["#f59e0b", "#f97316", "#ef4444", "#ec4899", "#d946ef", "#a855f7", "#6366f1"]}
          />
        </section>

        {/* Table */}
        <section>
          <ApplicantsTable data={rawData} />
        </section>

        {/* Footer */}
        <footer className="text-center py-6 text-xs text-zinc-600 border-t border-[var(--card-border)]">
          GGSC Recruitment Drive 2026 &middot; Dashboard powered by Next.js &amp; Recharts
        </footer>
      </main>
    </div>
  );
}
