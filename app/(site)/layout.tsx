import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSettings, hasPublishedPosts } from "@/lib/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [settings, showBlog] = await Promise.all([getSettings(), hasPublishedPosts()]);

  return (
    <>
      <SiteHeader name={settings.name} showBlog={showBlog} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} showBlog={showBlog} />
    </>
  );
}
