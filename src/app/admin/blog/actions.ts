"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdminOrOrganizer } from "@/lib/auth/admin";

export async function deletePostAction(slug: string) {
  await requireAdminOrOrganizer();
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function togglePublishAction(slug: string, currentPublished: boolean) {
  await requireAdminOrOrganizer();
  const supabase = await createClient();

  const { error } = await supabase
    .from("posts")
    .update({ published: !currentPublished })
    .eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function savePostAction(prevState: any, formData: FormData) {
  const admin = await requireAdminOrOrganizer();
  const supabase = await createClient();

  const slug = formData.get("slug")?.toString().trim().toLowerCase();
  const title = formData.get("title")?.toString().trim();
  const excerpt = formData.get("excerpt")?.toString().trim();
  const author = formData.get("author")?.toString().trim() || admin.fullName;
  const authorRole = formData.get("authorRole")?.toString().trim() || "Organizer, BuildFest Kashmir";
  const readTime = formData.get("readTime")?.toString().trim() || "4 min read";
  const tagsRaw = formData.get("tags")?.toString().trim() || "Community";
  const gradient = formData.get("gradient")?.toString().trim() || "from-amber-500/20 via-orange-500/10 to-transparent";
  const image = formData.get("image")?.toString().trim() || null;
  const contentRaw = formData.get("content")?.toString().trim() || "";
  const published = formData.get("published") === "true";

  if (!slug || !title || !excerpt || !contentRaw) {
    return { error: "Please provide title, slug, excerpt, and article content." };
  }

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const content = contentRaw
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const payload = {
    slug,
    title,
    excerpt,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    author,
    author_role: authorRole,
    read_time: readTime,
    tags,
    gradient,
    image,
    content,
    published,
  };

  const { error } = await supabase.from("posts").upsert(payload, { onConflict: "slug" });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blog");
}
