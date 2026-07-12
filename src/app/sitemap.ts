import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";
import { events } from "@/lib/constants/events";
import { blogPosts } from "@/lib/constants/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/community",
    "/events",
    "/gallery",
    "/team",
    "/team/join",
    "/blog",
    "/partners",
    "/contact",
  ];
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteConfig.url}/events/${event.slug}`,
    lastModified: new Date(event.startDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...eventRoutes, ...blogRoutes];
}
