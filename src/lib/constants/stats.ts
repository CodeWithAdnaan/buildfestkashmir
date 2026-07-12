export interface CommunityStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

export const communityStats: CommunityStat[] = [
  { id: "members", value: 1400, suffix: "", label: "Members" },
  { id: "events", value: 38, suffix: "+", label: "Events hosted" },
  { id: "universities", value: 21, suffix: "", label: "Partner universities" },
  { id: "projects", value: 260, suffix: "+", label: "Projects shipped" },
];
