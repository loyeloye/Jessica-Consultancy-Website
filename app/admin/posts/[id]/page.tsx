import { notFound } from "next/navigation";
import { AdminHeading } from "@/components/admin/ui";
import { PostForm } from "@/components/admin/PostForm";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Post } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: PageProps<"/admin/posts/[id]">) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  if (!supabase) notFound();

  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const post: Post = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body ?? "",
    coverImage: data.cover_image,
    coverAlt: data.cover_alt,
    status: data.status,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
  };

  return (
    <>
      <AdminHeading title="Edit post" />
      <PostForm post={post} />
    </>
  );
}
