export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author: string;
  authorRole: string;
  readTime: string;
  tags: string[];
  gradient: string;
  image?: string;
  content: string[]; // paragraphs
}
