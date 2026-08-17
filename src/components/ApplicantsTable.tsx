"use client";

interface TableProps {
  data: {
    id: number;
    fullName: string;
    university: string;
    yearOfStudy: string;
    department: string;
    domains: string;
    willingToParticipate: string;
    joinedWhatsApp: string;
  }[];
}

export default function ApplicantsTable({ data }: TableProps) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 overflow-hidden">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
        All Applicants ({data.length})
      </h3>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-[var(--card-bg)]">
            <tr className="border-b border-[var(--card-border)]">
              <th className="text-left py-3 px-3 text-zinc-500 font-medium">#</th>
              <th className="text-left py-3 px-3 text-zinc-500 font-medium">Name</th>
              <th className="text-left py-3 px-3 text-zinc-500 font-medium">University</th>
              <th className="text-left py-3 px-3 text-zinc-500 font-medium">Year</th>
              <th className="text-left py-3 px-3 text-zinc-500 font-medium">Department</th>
              <th className="text-left py-3 px-3 text-zinc-500 font-medium">Domains</th>
              <th className="text-left py-3 px-3 text-zinc-500 font-medium">Participate</th>
              <th className="text-left py-3 px-3 text-zinc-500 font-medium">WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[var(--card-border)] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-3 text-zinc-600">{row.id}</td>
                <td className="py-3 px-3 text-zinc-200 font-medium">{row.fullName}</td>
                <td className="py-3 px-3 text-zinc-400 max-w-[200px] truncate">{row.university}</td>
                <td className="py-3 px-3 text-zinc-400">{row.yearOfStudy}</td>
                <td className="py-3 px-3 text-zinc-400">{row.department}</td>
                <td className="py-3 px-3 text-zinc-400 max-w-[250px] truncate">{row.domains}</td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.willingToParticipate.toLowerCase().includes("fully committed")
                        ? "bg-green-500/15 text-green-400"
                        : "bg-yellow-500/15 text-yellow-400"
                    }`}
                  >
                    {row.willingToParticipate || "N/A"}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.joinedWhatsApp.toLowerCase().includes("yes")
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {row.joinedWhatsApp || "N/A"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
