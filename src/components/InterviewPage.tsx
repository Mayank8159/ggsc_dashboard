"use client";

import { useState, useMemo } from "react";
import type { InterviewAssignment } from "@/lib/data";

interface Props {
  assignments: InterviewAssignment[];
}

export default function InterviewPage({ assignments }: Props) {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const totalAssigned = assignments.reduce(
    (sum, a) => sum + (a.team.teamName !== "Unassigned" ? a.applicants.length : 0),
    0
  );

  const filteredAssignments = useMemo(
    () =>
      assignments.map((a) => ({
        ...a,
        applicants: a.applicants.filter(
          (app) =>
            app.fullName.toLowerCase().includes(search.toLowerCase()) ||
            app.university.toLowerCase().includes(search.toLowerCase()) ||
            app.department.toLowerCase().includes(search.toLowerCase()) ||
            app.domains.toLowerCase().includes(search.toLowerCase())
        ),
      })),
    [assignments, search]
  );

  return (
    <div className="space-y-6">
      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {assignments
          .filter((a) => a.team.teamName !== "Unassigned")
          .map((a) => (
            <button
              key={a.team.teamName}
              onClick={() =>
                setExpandedTeam(expandedTeam === a.team.teamName ? null : a.team.teamName)
              }
              className={`card-glow rounded-xl border p-4 text-left transition-all ${
                expandedTeam === a.team.teamName
                  ? "border-[color:var(--accent)]"
                  : "border-[var(--card-border)]"
              } bg-[var(--card-bg)]`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: a.team.color }}
                />
                <h4 className="text-xs font-semibold text-zinc-300 truncate">
                  {a.team.teamName}
                </h4>
              </div>
              <p className="text-2xl font-bold text-zinc-100 tabular-nums mb-2">
                {a.applicants.length}
              </p>
              <p className="text-[10px] text-zinc-600 mb-2">
                {a.team.members.length} member{a.team.members.length !== 1 ? "s" : ""}
              </p>
              {a.team.schedule.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                    {s.days}
                  </span>
                  <span className="text-[10px] text-zinc-600">{s.time}</span>
                </div>
              ))}
            </button>
          ))}
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search applicants by name, university, department, or domain..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* Team Panels */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => {
          const isOpen = expandedTeam === assignment.team.teamName;
          const core = assignment.team.members.filter((m) => !m.optional);
          const optional = assignment.team.members.filter((m) => m.optional);

          return (
            <div
              key={assignment.team.teamName}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedTeam(isOpen ? null : assignment.team.teamName)}
                className="w-full px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: assignment.team.color }}
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-200 truncate">
                        {assignment.team.teamName}
                      </h3>
                      {/* Members row */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {core.map((m) => (
                          <span
                            key={m.name}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border border-zinc-600 text-zinc-200 bg-zinc-800"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {m.name}
                          </span>
                        ))}
                        {optional.map((m) => (
                          <span
                            key={m.name}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border border-dashed border-zinc-700 text-zinc-500 bg-zinc-800/50"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                            {m.name}
                            <span className="text-zinc-700">opt</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Schedule */}
                    <div className="hidden sm:flex flex-col items-end gap-1">
                      {assignment.team.schedule.map((s, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-md">
                            {s.days}
                          </span>
                          <span className="text-[11px] text-zinc-500 whitespace-nowrap">{s.time}</span>
                        </div>
                      ))}
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full shrink-0"
                      style={{
                        backgroundColor: `${assignment.team.color}18`,
                        color: assignment.team.color,
                      }}
                    >
                      {assignment.applicants.length}
                    </span>
                    <svg
                      className={`w-4 h-4 text-zinc-500 transition-transform shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Table */}
              {isOpen && (
                <div className="border-t border-[var(--card-border)]">
                  {assignment.applicants.length === 0 ? (
                    <p className="text-center py-8 text-zinc-600 text-sm">
                      No applicants match your search.
                    </p>
                  ) : (
                    <div className="table-scroll overflow-auto">
                      <table className="w-full text-sm sticky-header">
                        <thead>
                          <tr className="border-b border-[var(--card-border)]">
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] w-10">#</th>
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] whitespace-nowrap">Name</th>
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] whitespace-nowrap">Email</th>
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] whitespace-nowrap">Phone</th>
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] whitespace-nowrap">University</th>
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] whitespace-nowrap">Year</th>
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] whitespace-nowrap">Dept</th>
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] whitespace-nowrap">Domains</th>
                            <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-[11px] whitespace-nowrap">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignment.applicants.map((app, idx) => (
                            <tr
                              key={app.id}
                              className="border-b border-[var(--card-border)]/50 hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="py-2.5 px-4 text-zinc-600 text-xs tabular-nums">{idx + 1}</td>
                              <td className="py-2.5 px-4 font-medium text-zinc-100 text-xs whitespace-nowrap">
                                {app.fullName}
                              </td>
                              <td className="py-2.5 px-4 text-zinc-400 text-xs whitespace-nowrap max-w-[160px] truncate">
                                <a href={`mailto:${app.email}`} className="hover:text-[var(--accent)] transition-colors">
                                  {app.email}
                                </a>
                              </td>
                              <td className="py-2.5 px-4 text-zinc-400 text-xs whitespace-nowrap tabular-nums">
                                {app.phoneNumber || "—"}
                              </td>
                              <td className="py-2.5 px-4 text-zinc-400 text-xs whitespace-nowrap max-w-[180px] truncate">
                                {app.university}
                              </td>
                              <td className="py-2.5 px-4 text-xs whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-medium">
                                  {app.yearOfStudy}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 text-zinc-400 text-xs whitespace-nowrap">
                                {app.department}
                              </td>
                              <td className="py-2.5 px-4 text-xs max-w-[200px]">
                                <div className="flex flex-wrap gap-1">
                                  {app.domains.split(",").slice(0, 2).map((d, i) => (
                                    <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 whitespace-nowrap">
                                      {d.trim()}
                                    </span>
                                  ))}
                                  {app.domains.split(",").length > 2 && (
                                    <span className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-500">
                                      +{app.domains.split(",").length - 2}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-2.5 px-4 whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                                      app.willingToParticipate.toLowerCase().includes("fully committed")
                                        ? "bg-green-500/15 text-green-400"
                                        : app.willingToParticipate
                                        ? "bg-yellow-500/15 text-yellow-400"
                                        : "bg-zinc-800 text-zinc-500"
                                    }`}
                                  >
                                    {app.willingToParticipate.toLowerCase().includes("fully committed")
                                      ? "OK"
                                      : app.willingToParticipate
                                      ? "Partial"
                                      : "N/A"}
                                  </span>
                                  <span
                                    className={`w-2 h-2 rounded-full ${
                                      app.joinedWhatsApp.toLowerCase().includes("yes")
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
