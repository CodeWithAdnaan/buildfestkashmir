export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const homeFaq: FaqItem[] = [
  {
    id: "team",
    question: "Do I need a team to register?",
    answer:
      "No. You can register solo and we'll help you find teammates at a team-formation session the week before — most first-timers do this.",
  },
  {
    id: "cs-only",
    question: "Is this only for CS students?",
    answer:
      "Not at all. Some of our strongest projects have come from design, business, and even biology students pairing up with developers. If you can contribute, you belong here.",
  },
  {
    id: "beginner",
    question: "What if I've never built anything before?",
    answer:
      "Good — that's exactly who our beginner track and mentors are for. We run a pre-event workshop specifically for first-timers, no experience assumed.",
  },
  {
    id: "fee",
    question: "Is there a registration fee?",
    answer:
      "No. BuildFest is free to attend, thanks to our university and sponsor partners. Meals and a place to sleep on-site are covered.",
  },
];
