"use client";

import { useState } from "react";
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

  const filteredAssignments = assignments.map((a) => ({
    ...a,
    applicants: a.applicants.filter(
      (app) =>
        app.fullName.toLowerCase().includes(search.toLowerCase()) ||
        app.university.toLowerCase().includes(search.toLowerCase()) ||
        app.department.toLowerCase().includes(search.toLowerCase()) ||
        app.domains.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex flex-wrap gap-3">
        {assignments
          .filter((a) => a.team.teamName !== "Unassigned")
          .map((a) => (
            <div
              key={a.team.teamName}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: a.team.color }}
              />
              <span className="text-xs text-zinc-400">{a.team.teamName}</span>
              <span className="text-xs font-bold text-zinc-200">
                {a.applicants.length}
              </span>
            </div>
          ))}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
          <span className="text-xs text-zinc-400">Total Assigned</span>
          <span className="text-xs font-bold text-green-400">{totalAssigned}</span>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, university, department, or domain..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:border-[var(--accent)] transition-colors"
      />

      {/* Teams */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.team.teamName}
            className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden"
          >
            {/* Team Header */}
            <button
              onClick={() =>
                setExpandedTeam(
                  expandedTeam === assignment.team.teamName
                    ? null
                    : assignment.team.teamName
                )
              }
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: assignment.team.color }}
                />
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-zinc-200">
                    {assignment.team.teamName}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Interviewers: {assignment.team.interviewers.join(", ") || "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${assignment.team.color}20`,
                    color: assignment.team.color,
                  }}
                >
                  {assignment.applicants.length} applicants
                </span>
                <svg
                  className={`w-4 h-4 text-zinc-500 transition-transform ${
                    expandedTeam === assignment.team.teamName ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Applicant List */}
            {expandedTeam === assignment.team.teamName && (
              <div className="border-t border-[var(--card-border)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/[0.02]">
                      <tr className="border-b border-[var(--card-border)]">
                        <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-xs">
                          #
                        </th>
                        <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-xs">
                          Name
                        </th>
                        <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-xs">
                          University
                        </th>
                        <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-xs">
                          Year
                        </th>
                        <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-xs">
                          Department
                        </th>
                        <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-xs">
                          Domains Applied
                        </th>
                        <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-xs">
                          Commitment
                        </th>
                        <th className="text-left py-2.5 px-4 text-zinc-500 font-medium text-xs">
                          WhatsApp
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignment.applicants.map((app, idx) => (
                        <tr
                          key={app.id}
                          className="border-b border-[var(--card-border)]/50 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-2.5 px-4 text-zinc-600">{idx + 1}</td>
                          <td className="py-2.5 px-4 text-zinc-200 font-medium">
                            {app.fullName}
                          </td>
                          <td className="py-2.5 px-4 text-zinc-400 max-w-[180px] truncate">
                            {app.university}
                          </td>
                          <td className="py-2.5 px-4 text-zinc-400">{app.yearOfStudy}</td>
                          <td className="py-2.5 px-4 text-zinc-400">{app.department}</td>
                          <td className="py-2.5 px-4 text-zinc-400 max-w-[250px] truncate">
                            {app.domains}
                          </td>
                          <td className="py-2.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                app.willingToParticipate.toLowerCase().includes("fully committed")
                                  ? "bg-green-500/15 text-green-400"
                                  : "bg-yellow-500/15 text-yellow-400"
                              }`}
                            >
                              {app.willingToParticipate.toLowerCase().includes("fully committed")
                                ? "Fully Committed"
                                : "Partial"}
                            </span>
                          </td>
                          <td className="py-2.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                app.joinedWhatsApp.toLowerCase().includes("yes")
                                  ? "bg-green-500/15 text-green-400"
                                  : "bg-red-500/15 text-red-400"
                              }`}
                            >
                              {app.joinedWhatsApp.toLowerCase().includes("yes") ? "Yes" : "No"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {assignment.applicants.length === 0 && (
                  <p className="text-center py-6 text-zinc-600 text-sm">
                    No applicants match your search.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
