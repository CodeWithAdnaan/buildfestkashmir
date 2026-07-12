import type { BlogPost } from "@/types/post";

export const blogPosts: BlogPost[] = [
  {
    slug: "why-we-started-buildfest",
    title: "Why we started BuildFest with three people and a college lab",
    excerpt:
      "In 2023, there wasn't a single active student developer community in Srinagar. Here's what changed, and what it took to get the first ten people in a room.",
    date: "2026-01-14",
    author: "Adnan Farooq",
    authorRole: "Founder & Lead Mentor",
    readTime: "6 min read",
    tags: ["Community", "Origin Story"],
    gradient: "from-[#3a5c48] to-[#16302a]",
    content: [
      "In late 2023, a friend and I sat in an empty computer lab after hours trying to figure out why nobody in our college had ever built anything outside of an assignment. Not because people didn't want to — we just didn't know each other existed.",
      "There was no Discord server, no meetup, no 'this is where the builders are' signal anywhere in the city. So we made one. The first BuildFest event was ten people in that same lab, a borrowed projector, and a two-hour talk on Git that ran forty minutes over because nobody wanted to leave.",
      "What surprised us wasn't that people showed up — it was how many of them stayed. Six months later, three of those ten were teaching the next workshop. That's the whole model, really: nobody graduates out of BuildFest, they just move from the front row to the front of the room.",
      "We're a long way from ten people now, but the instinct that started it hasn't changed. If there's no room for students to build in, you don't wait for someone else to make one.",
    ],
  },
  {
    slug: "kashedu-hackathon-to-real-product",
    title: "How KashEdu went from a hackathon weekend to a real product",
    excerpt:
      "The team behind KashEdu won HACKDAYS with a rough prototype. A year later it's used by students across three districts. Here's what happened in between.",
    date: "2026-12-20",
    author: "Mohammad Mushtaq",
    authorRole: "Founder & Operations",
    readTime: "8 min read",
    tags: ["Case Study", "Open Source"],
    gradient: "from-[#4a3a26] to-[#1c1710]",
    content: [
      "We built the first version of KashEdu in about 30 of the 36 hours we had at HACKDAYS — an offline-first app that lets students ask questions and get AI-generated explanations without needing reliable internet, which is still a real constraint in a lot of the districts we grew up in.",
      "Winning felt good, but the actual work started the week after, when the prize money ran out and it was just three of us deciding whether this was a hackathon project or an actual product. We chose the second one, mostly because a teacher in Anantnag messaged us asking if her students could keep using it.",
      "A year on, KashEdu is genuinely used — not 'downloaded and forgotten', actually opened every week — by students across three districts. None of us have full-time jobs on this; we're still students. But the mentor rotation at HACKDAYS meant we had actual engineers reviewing our architecture from day one, which is the entire reason the offline sync layer didn't fall over the first time we had real users.",
      "If you're building something at this year's HACKDAYS: the demo doesn't need to be perfect. It needs one person in the room to actually want to keep using it after you turn your laptop off.",
    ],
  },
  {
    slug: "first-pull-request-open-source-sprint",
    title: "What actually happens at a beginner-only open source sprint",
    excerpt:
      "Most students never contribute to open source because the first PR feels impossible to start. We ran a sprint specifically to fix that. Here's what worked.",
    date: "2026-11-10",
    author: "Mehraan Amin",
    authorRole: "Founder",
    readTime: "5 min read",
    tags: ["Open Source", "Beginner Friendly"],
    gradient: "from-[#33574a] to-[#122320]",
    content: [
      "The single biggest blocker to someone's first open source contribution isn't skill — it's not knowing what a reasonable first issue even looks like. Most 'good first issue' labels on big projects are still intimidating if you've never opened a pull request in your life.",
      "So for the Open Source Sprint, we did something deliberately small: every attendee got paired 1:1 with a maintainer from an actual BuildFest project, and the issue was pre-scoped before they even arrived. No searching, no guessing, no 20 open tabs trying to understand a codebase from scratch.",
      "The tone mattered as much as the pairing. We told every mentor explicitly: your job today isn't to write the code faster than them, it's to make sure they understand every line they end up committing. A few sessions ran long because someone wanted to actually understand a regex before shipping it, and that's exactly the outcome we wanted.",
      "38 people merged their first pull request that day. A few of them are mentoring the next cohort themselves now, which is the only metric that actually matters here.",
    ],
  },
  {
    slug: "designing-for-a-community-not-a-brand",
    title: "Designing for a community, not a brand",
    excerpt:
      "Every design decision on this site and our event materials starts from the same question: does this feel like something a student made, or something a marketing team approved?",
    date: "2026-10-02",
    author: "Adnan Farooq",
    authorRole: "Founder & Lead",
    readTime: "4 min read",
    tags: ["Design"],
    gradient: "from-[#5c4426] to-[#241a0e]",
    content: [
      "When I took over design for BuildFest, the temptation was to make everything look like a startup — polished, corporate, 'professional'. We tried that for one event poster and it felt completely wrong. It read like a brand talking at students, not students talking to each other.",
      "The shift that actually worked was treating every design decision as a question of honesty rather than polish. Does this photo look like our actual event, or a stock photo of people who've never been to Kashmir? Does this color palette feel like it belongs to us, or could it belong to literally any tech conference anywhere?",
      "That's part of why this website leans on saffron as the one accent instead of the generic blue-purple gradient every dev tool site uses — it's a small thing, but it's ours, and it doesn't pretend to be anyone else's brand.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getSortedPosts() {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
