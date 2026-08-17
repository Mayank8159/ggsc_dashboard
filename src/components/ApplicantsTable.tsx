"use client";

import { useState, useMemo } from "react";

interface Applicant {
  id: number;
  fullName: string;
  email: string;
  university: string;
  yearOfStudy: string;
  department: string;
  phoneNumber: string | number;
  domains: string;
  willingToParticipate: string;
  joinedWhatsApp: string;
  previousExperience: string;
}

interface TableProps {
  data: Applicant[];
}

type SortKey = "fullName" | "university" | "yearOfStudy" | "department" | "domains";

export default function ApplicantsTable({ data }: TableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("fullName");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const result = data.filter(
      (r) =>
        r.fullName.toLowerCase().includes(q) ||
        r.university.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.yearOfStudy.toLowerCase().includes(q) ||
        r.domains.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
    );
    result.sort((a, b) => {
      const aVal = String(a[sortKey]).toLowerCase();
      const bVal = String(b[sortKey]).toLowerCase();
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    return result;
  }, [data, search, sortKey, sortAsc]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="text-zinc-700 ml-1">&#8597;</span>;
    return <span className="text-[var(--accent)] ml-1">{sortAsc ? "&#9650;" : "&#9660;"}</span>;
  }

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 pb-0">
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          All Applicants ({filtered.length} of {data.length})
        </h3>
        <div className="flex gap-3">
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400">
              {data.filter((d) => d.willingToParticipate.toLowerCase().includes("fully committed")).length} committed
            </span>
            <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400">
              {data.filter((d) => d.joinedWhatsApp.toLowerCase().includes("yes")).length} whatsapp
            </span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-zinc-200 text-xs placeholder-zinc-600 focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      </div>

      <div className="table-scroll overflow-auto max-h-[600px] mt-3">
        <table className="w-full text-sm sticky-header">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="text-left py-3 px-4 text-zinc-500 font-medium text-xs w-10">#</th>
              <th
                className="text-left py-3 px-4 text-zinc-500 font-medium text-xs cursor-pointer hover:text-zinc-300 select-none whitespace-nowrap"
                onClick={() => handleSort("fullName")}
              >
                Name <SortIcon col="fullName" />
              </th>
              <th className="text-left py-3 px-4 text-zinc-500 font-medium text-xs whitespace-nowrap">Email</th>
              <th className="text-left py-3 px-4 text-zinc-500 font-medium text-xs whitespace-nowrap">Phone</th>
              <th
                className="text-left py-3 px-4 text-zinc-500 font-medium text-xs cursor-pointer hover:text-zinc-300 select-none whitespace-nowrap"
                onClick={() => handleSort("university")}
              >
                University <SortIcon col="university" />
              </th>
              <th
                className="text-left py-3 px-4 text-zinc-500 font-medium text-xs cursor-pointer hover:text-zinc-300 select-none whitespace-nowrap"
                onClick={() => handleSort("yearOfStudy")}
              >
                Year <SortIcon col="yearOfStudy" />
              </th>
              <th
                className="text-left py-3 px-4 text-zinc-500 font-medium text-xs cursor-pointer hover:text-zinc-300 select-none whitespace-nowrap"
                onClick={() => handleSort("department")}
              >
                Department <SortIcon col="department" />
              </th>
              <th
                className="text-left py-3 px-4 text-zinc-500 font-medium text-xs cursor-pointer hover:text-zinc-300 select-none whitespace-nowrap"
                onClick={() => handleSort("domains")}
              >
                Domains <SortIcon col="domains" />
              </th>
              <th className="text-left py-3 px-4 text-zinc-500 font-medium text-xs whitespace-nowrap">Experience</th>
              <th className="text-left py-3 px-4 text-zinc-500 font-medium text-xs whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr
                key={row.id}
                className="border-b border-[var(--card-border)]/50 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-4 text-zinc-600 text-xs tabular-nums">{idx + 1}</td>
                <td className="py-3 px-4 font-medium text-zinc-100 whitespace-nowrap">
                  {row.fullName}
                </td>
                <td className="py-3 px-4 text-zinc-400 text-xs whitespace-nowrap max-w-[200px] truncate">
                  <a href={`mailto:${row.email}`} className="hover:text-[var(--accent)] transition-colors">
                    {row.email}
                  </a>
                </td>
                <td className="py-3 px-4 text-zinc-400 text-xs whitespace-nowrap tabular-nums">
                  {row.phoneNumber || "—"}
                </td>
                <td className="py-3 px-4 text-zinc-400 text-xs whitespace-nowrap max-w-[200px] truncate">
                  {row.university}
                </td>
                <td className="py-3 px-4 text-xs whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-medium">
                    {row.yearOfStudy}
                  </span>
                </td>
                <td className="py-3 px-4 text-zinc-400 text-xs whitespace-nowrap">
                  {row.department}
                </td>
                <td className="py-3 px-4 text-zinc-400 text-xs max-w-[220px]">
                  <div className="flex flex-wrap gap-1">
                    {row.domains.split(",").slice(0, 3).map((d, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 whitespace-nowrap">
                        {d.trim()}
                      </span>
                    ))}
                    {row.domains.split(",").length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-500">
                        +{row.domains.split(",").length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-xs whitespace-nowrap">
                  {row.previousExperience.toLowerCase() === "no" ||
                  row.previousExperience.toLowerCase() === "na" ||
                  row.previousExperience.toLowerCase() === "n/a" ? (
                    <span className="text-zinc-600">None</span>
                  ) : (
                    <span className="text-zinc-400">Yes</span>
                  )}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                        row.willingToParticipate.toLowerCase().includes("fully committed")
                          ? "bg-green-500/15 text-green-400"
                          : row.willingToParticipate
                          ? "bg-yellow-500/15 text-yellow-400"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {row.willingToParticipate.toLowerCase().includes("fully committed")
                        ? "Committed"
                        : row.willingToParticipate
                        ? "Partial"
                        : "N/A"}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        row.joinedWhatsApp.toLowerCase().includes("yes")
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      title={row.joinedWhatsApp.toLowerCase().includes("yes") ? "WhatsApp: Yes" : "WhatsApp: No"}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="text-center py-8 text-zinc-600 text-sm">No applicants match your search.</p>
      )}
    </div>
  );
}
