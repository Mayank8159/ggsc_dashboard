"use client";

import { useState } from "react";
import { getAnalytics, rawData, getInterviewAssignments } from "@/lib/data";
import StatCard from "@/components/StatCard";
import BarChartCard from "@/components/BarChart";
import PieChartCard from "@/components/PieChart";
import ApplicantsTable from "@/components/ApplicantsTable";
import InterviewPage from "@/components/InterviewPage";

const analytics = getAnalytics(rawData);
const assignments = getInterviewAssignments(rawData);

const committedCount = rawData.filter(
  (d) => d.willingToParticipate.toLowerCase().includes("fully committed")
).length;
const whatsappCount = rawData.filter(
  (d) => d.joinedWhatsApp.toLowerCase().includes("yes")
).length;
const uniqueUniversities = new Set(rawData.map((d) => d.university)).size;

type Tab = "dashboard" | "interviews";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              }}
            >
              G
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-zinc-100 truncate">
                GGSC Recruitment Dashboard
              </h1>
              <p className="text-xs text-zinc-500">Drive 2026 - Response Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-zinc-600 bg-[var(--card-bg)] border border-[var(--card-border)] px-3 py-1.5 rounded-lg tabular-nums">
              {analytics.total} responses &middot; {uniqueUniversities} universities
            </span>
            <span className="sm:hidden text-xs text-zinc-600 bg-[var(--card-bg)] border border-[var(--card-border)] px-2 py-1.5 rounded-lg tabular-nums">
              {analytics.total}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
          <div className="flex gap-1 -mb-px">
            {(
              [
                ["dashboard", "Analytics Dashboard"],
                ["interviews", "Interview Assignments"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {activeTab === "dashboard" && (
          <>
            {/* Stats Row */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <StatCard label="Total Applicants" value={analytics.total} icon="👥" color="#6366f1" />
              <StatCard label="Universities" value={uniqueUniversities} icon="🏛" color="#8b5cf6" />
              <StatCard label="Fully Committed" value={committedCount} icon="✅" color="#22c55e" />
              <StatCard label="Joined WhatsApp" value={whatsappCount} icon="💬" color="#14b8a6" />
            </section>

            {/* Charts Row 1 */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <BarChartCard data={analytics.domainCounts} title="Domain Preferences" layout="vertical" />
              <PieChartCard data={analytics.yearCounts} title="Year of Study Distribution" />
            </section>

            {/* Charts Row 2 */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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

            {/* Charts Row 3 */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <PieChartCard data={analytics.participationCounts} title="Commitment Level" colors={["#22c55e", "#f59e0b", "#ef4444"]} />
              <PieChartCard data={analytics.whatsappCounts} title="WhatsApp Group Status" colors={["#22c55e", "#ef4444", "#6366f1"]} />
              <PieChartCard data={analytics.experienceCounts} title="Prior Experience" colors={["#6366f1", "#a1a1aa"]} />
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
          </>
        )}

        {activeTab === "interviews" && <InterviewPage assignments={assignments} />}

        {/* Footer */}
        <footer className="text-center py-6 text-xs text-zinc-700 border-t border-[var(--card-border)]">
          GGSC Recruitment Drive 2026 &middot; Built with Next.js &amp; Recharts
        </footer>
      </main>
    </div>
  );
}
