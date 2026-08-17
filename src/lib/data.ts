import responses from "@/data/responses.json";

export interface Response {
  id: number;
  timestamp: string;
  email: string;
  fullName: string;
  university: string;
  yearOfStudy: string;
  department: string;
  phoneNumber: string;
  aboutSelf: string;
  passion: string;
  domains: string;
  previousExperience: string;
  portfolioLinks: string;
  whyGGSC: string;
  uniqueContribution: string;
  willingToParticipate: string;
  joinedWhatsApp: string;
  howHeard: string;
}

export type ResponseData = Response[];

function countOccurrences(items: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    if (item && item.toLowerCase() !== "n/a" && item.toLowerCase() !== "na" && item.toLowerCase() !== "no") {
      const parts = item.split(",").map((s) => s.trim());
      parts.forEach((part) => {
        if (part) {
          counts[part] = (counts[part] || 0) + 1;
        }
      });
    }
  });
  return counts;
}

function countField(items: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    const val = (item || "").trim();
    if (val) {
      counts[val] = (counts[val] || 0) + 1;
    }
  });
  return counts;
}

export function getAnalytics(data: ResponseData) {
  const total = data.length;

  const yearCounts = countField(data.map((d) => d.yearOfStudy));
  const departmentCounts = countField(data.map((d) => d.department));
  const universityCounts = countField(data.map((d) => d.university));
  const domainCounts = countOccurrences(data.map((d) => d.domains));
  const participationCounts = countField(data.map((d) => d.willingToParticipate));
  const whatsappCounts = countField(data.map((d) => d.joinedWhatsApp));
  const heardCounts = countField(data.map((d) => d.howHeard));
  const experienceCounts = countField(
    data.map((d) => {
      const exp = d.previousExperience.toLowerCase();
      if (exp === "no" || exp === "na" || exp === "n/a") return "No Experience";
      if (exp.length > 0) return "Has Experience";
      return "";
    })
  );

  const topDomains = Object.entries(domainCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));

  const topUniversities = Object.entries(universityCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  const yearData = Object.entries(yearCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }));

  const departmentData = Object.entries(departmentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));

  const participationData = Object.entries(participationCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const whatsappData = Object.entries(whatsappCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const heardData = Object.entries(heardCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }));

  const experienceData = Object.entries(experienceCounts)
    .filter(([name]) => name)
    .map(([name, value]) => ({ name, value }));

  return {
    total,
    yearCounts: yearData,
    departmentCounts: departmentData,
    universityCounts: topUniversities,
    domainCounts: topDomains,
    participationCounts: participationData,
    whatsappCounts: whatsappData,
    heardCounts: heardData,
    experienceCounts: experienceData,
  };
}

export const rawData: ResponseData = responses as ResponseData;

export interface InterviewTeam {
  teamName: string;
  color: string;
  members: { name: string; optional: boolean }[];
  schedule: { days: string; time: string }[];
  domainKeywords: string[];
}

export const interviewTeams: InterviewTeam[] = [
  {
    teamName: "Photography / Editing / Graphics",
    color: "#d946ef",
    members: [
      { name: "Suvrojeet", optional: false },
      { name: "Swastik", optional: false },
      { name: "Debojeet", optional: false },
    ],
    schedule: [
      { days: "D1 + D2", time: "11 AM – 2 PM" },
    ],
    domainKeywords: ["photography", "photo", "editing", "graphic", "graphics", "design", "visual", "video", "cinematography", "thumbnail", "poster", "branding"],
  },
  {
    teamName: "Content",
    color: "#f59e0b",
    members: [
      { name: "Pallabi", optional: false },
      { name: "Subham", optional: false },
      { name: "Ritimukta", optional: true },
    ],
    schedule: [
      { days: "D1", time: "11 AM onwards" },
    ],
    domainKeywords: ["content", "writing", "blog", "article", "copywriting", "copy", "editorial", "storytelling", "creative writing"],
  },
  {
    teamName: "Social Media / PR",
    color: "#3b82f6",
    members: [
      { name: "Oyeshee", optional: false },
      { name: "Pallabi", optional: false },
      { name: "Debojeet", optional: false },
      { name: "Swastik", optional: false },
      { name: "Sattwik", optional: true },
    ],
    schedule: [
      { days: "D1 + D2", time: "5 PM onwards" },
    ],
    domainKeywords: ["social media", "social", "pr", "branding", "marketing", "community", "outreach", "promotion", "public relations"],
  },
  {
    teamName: "Std Ops / Logistics / Volunteer",
    color: "#22c55e",
    members: [
      { name: "Debayan", optional: false },
      { name: "Parnatosh", optional: false },
      { name: "Sagnik", optional: false },
      { name: "Suvrojeet", optional: true },
    ],
    schedule: [
      { days: "D1 + D2", time: "11 AM onwards" },
    ],
    domainKeywords: ["logistics", "volunteer", "operations", "management", "coordination", "planning", "event", "student operations", "std op"],
  },
  {
    teamName: "Web Development",
    color: "#6366f1",
    members: [
      { name: "Mayank", optional: false },
      { name: "Tridibesh", optional: false },
      { name: "Diptodeep", optional: true },
    ],
    schedule: [
      { days: "D1", time: "6 PM onwards" },
      { days: "D2", time: "6 PM onwards" },
    ],
    domainKeywords: ["web", "development", "coding", "programming", "frontend", "backend", "fullstack", "full stack", "app", "mobile", "android", "ios", "software", "web development", "web dev"],
  },
];

export interface InterviewAssignment {
  team: InterviewTeam;
  applicants: Response[];
}

export function getInterviewAssignments(data: ResponseData): InterviewAssignment[] {
  const assignedIds = new Set<number>();

  const assignments: InterviewAssignment[] = interviewTeams.map((team) => {
    const matched = data.filter((applicant) => {
      const domains = (applicant.domains || "").toLowerCase();
      return team.domainKeywords.some((kw) => domains.includes(kw));
    });
    matched.forEach((a) => assignedIds.add(a.id));
    return { team, applicants: matched };
  });

  const unassigned = data.filter((a) => !assignedIds.has(a.id));
  if (unassigned.length > 0) {
    assignments.push({
      team: {
        teamName: "Unassigned",
        color: "#71717a",
        members: [],
        schedule: [],
        domainKeywords: [],
      },
      applicants: unassigned,
    });
  }

  return assignments;
}
