import { AdminHeading } from "@/components/admin/ui";
import { CampaignForm } from "@/components/admin/CampaignForm";

export default function NewCampaignPage() {
  return (
    <>
      <AdminHeading title="New campaign" />
      <CampaignForm />
    </>
  );
}
