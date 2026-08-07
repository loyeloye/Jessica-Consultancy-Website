import { AdminHeading } from "@/components/admin/ui";
import { PostForm } from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <>
      <AdminHeading title="New post" />
      <PostForm />
    </>
  );
}
