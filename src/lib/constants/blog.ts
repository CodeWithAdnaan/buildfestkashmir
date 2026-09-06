import type { BlogPost } from "@/types/post";
import { createClient } from "@/lib/supabase/server";

export const blogPosts: BlogPost[] = [
  {
    slug: "the-3am-edge-building-in-kashmir",
    title: "The 3 AM Edge: Why Building in Kashmir is an Unfair Advantage",
    excerpt:
      "When connection drops every three hours and Stack Overflow isn't accessible, you stop copying snippets and start reading local docs. How constraints forced us to become original engineers.",
    date: "2026-06-10",
    author: "Adnan Farooq",
    authorRole: "Founder & Systems Engineer",
    readTime: "7 min read",
    tags: ["Engineering", "Philosophy", "Deep Work"],
    gradient: "from-[#4a2e1d] to-[#1a120c]",
    image: "/blog/3am-edge.png",
    content: [
      "People ask me all the time: isn't it harder to build software in a place with sporadic internet, zero local venture capital, and harsh winters where your fingers freeze while typing C++? My answer is always the same: it's not a disadvantage. It's an unfair advantage.",
      "## The Power of Hard Constraints",
      "When internet outages force you to cache entire docsets locally, you learn how software actually works under the hood. You don't copy-paste a Stack Overflow answer for a React re-render bug; you open Chrome DevTools, inspect the fiber tree, profile memory allocations, and write a custom memoization hook.",
      "> Extreme constraints eliminate lazy shortcuts. When documentation is local, deep understanding is the only option left.",
      "## Building Resilient Local Systems",
      "We built local offline-first sync protocols in C++ and WebAssembly not because it was trendy, but because our laptops literally lost connectivity mid-build. When you build under extreme constraints, the software you output is battle-tested, resilient, and impossible to break in production.",
      "```cpp\n// Lightweight local state checksum for low-bandwidth mesh sync\nuint32_t compute_state_hash(const std::vector<uint8_t>& buffer) {\n    uint32_t hash = 0x811c9dc5;\n    for (auto byte : buffer) {\n        hash ^= byte;\n        hash *= 0x01000193;\n    }\n    return hash;\n}\n```",
      "- Caching offline docs locally using Dash and zeal.\n- Building zero-latency CRDT state structures.\n- Profiling memory locality and cache misses in local dev.",
      "The tech world is drowning in wrapper apps around API endpoints. The engineers coming out of BuildFest Kashmir aren't building wrappers — they're writing custom query engines, lightweight neural network runtimes, and distributed peer-to-peer protocols. Constraint breeds absolute conviction.",
    ],
  },
  {
    slug: "stop-building-wrappers-death-of-engineering",
    title: "Stop Building Wrappers: The Death of Modern Software Engineering",
    excerpt:
      "If your entire tech startup can be replaced by a 10-line system prompt in a curl request, you haven't built a product — you've built a temporary illusion. Here's how we get back to real engineering.",
    date: "2026-04-28",
    author: "Adnan Farooq",
    authorRole: "Founder & Systems Engineer",
    readTime: "8 min read",
    tags: ["Tech Culture", "Systems", "Future"],
    gradient: "from-[#1c3b4a] to-[#0a1820]",
    image: "/blog/systems-engineering.png",
    content: [
      "We are currently living through the highest volume of low-effort software in human history. Thousands of apps are launched every week, 99% of which are thin UI skins calling the same external OpenAI endpoint with a slightly different dark mode gradient.",
      "## The Fallacy of Thin SaaS Wrappers",
      "At BuildFest, we banned 'API wrapper' hackathon submissions. If your project doesn't have a custom data structure, an offline database schema, or a custom algorithm, it's not a software prototype — it's just an API test call.",
      "> If your startup can be rendered obsolete by a minor API version bump, you built a feature, not a company.",
      "## Getting Back to Real Engineering",
      "When we forced teams to build their own local vector indexer in Rust instead of relying on hosted SaaS databases, something magical happened. Developers stopped treating code like magic spells and started understanding memory alignment, SIMD vector instructions, and L1/L2 cache locality.",
      "Real software engineering is about solving hard, unglamorous problems: zero-latency synchronization, local binary size optimization, and distributed consensus over noisy networks. That's what we teach, and that's the code that will survive the next decade.",
    ],
  },
  {
    slug: "how-to-learn-anything-in-72-hours",
    title: "How to Learn Anything in 72 Hours: A Hacker's Playbook",
    excerpt:
      "Tutorial hell is a trap designed for consumers, not creators. Here is the exact aggressive system I use to go from zero context in a framework or language to shipping production code in 3 days.",
    date: "2026-03-12",
    author: "Adnan Farooq",
    authorRole: "Founder & Systems Engineer",
    readTime: "6 min read",
    tags: ["Learning", "Hacking", "Mindset"],
    gradient: "from-[#3b1e4a] to-[#170a20]",
    image: "/blog/hacker-learning.png",
    content: [
      "Most beginners spend 4 weeks watching a 40-hour video course on YouTube before writing a single line of code. By video 12, they've forgotten video 1, and by video 30, they feel overwhelmed and quit. This is passive consumption, and it is the absolute enemy of mastery.",
      "## The 72-Hour Rapid Protocol",
      "My rule for learning any new technology — whether it's WebAssembly, Rust, custom compiler construction, or low-level kernel modules — is simple: Build a broken, minimal clone within 6 hours of opening the documentation.",
      "- Day 1: Read the core spec, ignore 'best practices', and break things intentionally.\n- Day 2: Implement a core feature from scratch without using external helper libraries.\n- Day 3: Profile the code, find where it crashes, optimize memory leaks, and refactor.",
      "> You don't need a 4-year degree to master system architecture. You need curiosity, a terminal, an appetite for compiler errors, and stubborn persistence.",
    ],
  },
  {
    slug: "architecture-of-resistance-offline-first",
    title: "The Architecture of Resistance: Software Built for Zero Connectivity",
    excerpt:
      "What happens when your cloud dependencies vanish? A deep technical breakdown of how we design local-first peer-to-peer data sync networks for remote valleys in Kashmir.",
    date: "2026-05-18",
    author: "Adnan Farooq",
    authorRole: "Founder & Systems Engineer",
    readTime: "9 min read",
    tags: ["Architecture", "Offline First", "Case Study"],
    gradient: "from-[#2d4a20] to-[#101f0b]",
    image: "/blog/offline-mesh.png",
    content: [
      "Cloud computing sold us a lie: that serverless functions and always-online WebSocket connections are the universal default. But in high-altitude valleys, remote villages, and disaster zones, cloud dependencies are a single point of catastrophic failure.",
      "## Local-First & Mesh Synchronization",
      "Over the last two years, we've designed local-first mesh sync layers using CRDTs (Conflict-free Replicated Data Types) and Bluetooth Low Energy / Local Wi-Fi direct connections. When two devices come within 50 meters of each other, they synchronize state silently without ever touching a central cloud server.",
      "> If your app can't function on a plane with airplane mode enabled, it doesn't really belong to the user. We build software that lasts.",
      "Local-first software gives users complete ownership of their data, instant local latency (0ms UI response times), and absolute immunity to corporate server shutdowns.",
    ],
  },
  {
    slug: "zero-to-one-pull-request-open-source",
    title: "The Zero-to-One Pull Request: Bridging the Mindset Gap in Open Source",
    excerpt:
      "The hardest part of open source isn't Git syntax — it's overcoming the psychological barrier of putting your code in front of the world. Here's how we mentored 50+ students to merge their first PR.",
    date: "2025-11-24",
    author: "Mehraan Amin",
    authorRole: "Co-Founder & Open Source Lead",
    readTime: "6 min read",
    tags: ["Open Source", "Mentorship", "Community"],
    gradient: "from-[#1c4a3b] to-[#0a2018]",
    image: "/blog/open-source.png",
    content: [
      "When a student opens their first Pull Request, their biggest fear isn't that their code has a syntax bug. It's the anxiety of public scrutiny — the idea that a maintainer will judge their competence based on a single commit.",
      "## Overcoming Code Anxiety",
      "To dismantle this barrier during our Open Source Sprint, we implemented a 1:1 pair-review system. Every student was matched with an experienced engineer who walked them through line-by-line profiling, commit hygiene, and writing clear semantic PR descriptions.",
      "> Code reviews aren't interrogations; they are collaborative polish sessions.",
      "Over 50 students merged their first open-source contributions that weekend. Today, three of those original first-timers are co-maintaining core repositories in the BuildFest ecosystem.",
    ],
  },
  {
    slug: "kashedu-hackathon-to-production-product",
    title: "From 36-Hour Hackdays Prototype to Production: The KashEdu Story",
    excerpt:
      "Winning HACKDAYS was the easy part. Turning an offline-first AI educational tool into an app used by thousands of students across 3 districts took grit, architectural rewrites, and field testing.",
    date: "2025-10-30",
    author: "Mohammad Mushtaq",
    authorRole: "Co-Organizer & Operations Lead",
    readTime: "7 min read",
    tags: ["Case Study", "Product", "Scale"],
    gradient: "from-[#4a3b1c] to-[#20180a]",
    image: "/blog/kashedu.png",
    content: [
      "We built the first build of KashEdu in 36 caffeinated hours during HACKDAYS — an offline-first mobile assistant that lets students query structured educational models without reliable internet access.",
      "## Moving Past Prototype Phase",
      "When the confetti settled and the trophy was placed on the shelf, reality hit us. Demo code built for a 3-minute pitch falls apart when 1,000 real students attempt concurrent local SQLite syncs over low-tier smartphones.",
      "We spent the next six months refactoring the storage layer, implementing local vector caching, and traveling to schools across three districts to watch actual students use the app under real conditions.",
      "> Trophies don't sustain products, user retention does. Today KashEdu handles tens of thousands of offline queries weekly, completely bootstrapped.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getSortedPosts() {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Async fetcher — queries Supabase `posts` table first, and falls back to static `blogPosts` array
 */
export async function fetchPostsFromSupabase(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });

    if (error || !data || data.length === 0) {
      return getSortedPosts();
    }

    return data.map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      date: item.date,
      author: item.author,
      authorRole: item.author_role,
      readTime: item.read_time,
      tags: item.tags || [],
      gradient: item.gradient,
      image: item.image || undefined,
      content: item.content || [],
    }));
  } catch {
    return getSortedPosts();
  }
}

/**
 * Async fetcher for single post — queries Supabase `posts` table first, and falls back to static array
 */
export async function fetchPostBySlugFromSupabase(slug: string): Promise<BlogPost | undefined> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return getPostBySlug(slug);
    }

    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      author: data.author,
      authorRole: data.author_role,
      readTime: data.read_time,
      tags: data.tags || [],
      gradient: data.gradient,
      image: data.image || undefined,
      content: data.content || [],
    };
  } catch {
    return getPostBySlug(slug);
  }
}
