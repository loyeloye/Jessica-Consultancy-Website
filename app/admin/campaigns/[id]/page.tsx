import { notFound } from "next/navigation";
import { AdminHeading } from "@/components/admin/ui";
import { CampaignForm } from "@/components/admin/CampaignForm";
import { getServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditCampaignPage({ params }: PageProps<"/admin/campaigns/[id]">) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  if (!supabase) notFound();

  const { data } = await supabase.from("campaigns").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <AdminHeading title={`Edit — ${data.client}`} />
      <CampaignForm
        campaign={{
          id: data.id,
          slug: data.slug,
          client: data.client,
          category: data.category ?? "",
          role: data.role ?? "",
          summary: data.summary ?? "",
          image: { src: data.hero_image ?? "", alt: data.hero_alt ?? "" },
          gallery: data.gallery ?? [],
          scope: data.scope ?? [],
          deliverables: data.deliverables ?? [],
          stakeholders: data.stakeholders ?? [],
          objectives: data.objectives ?? [],
          facts: data.facts ?? [],
          outcome: data.outcome ?? "",
          sortOrder: data.sort_order ?? 0,
          published: data.published ?? true,
        }}
      />
    </>
  );
}
