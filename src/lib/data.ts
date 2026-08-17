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
