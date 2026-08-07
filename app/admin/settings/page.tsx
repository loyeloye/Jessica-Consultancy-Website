import { getSettings } from "@/lib/content";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { AdminHeading, Card } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <AdminHeading
        title="Settings"
        description="Copy and contact details used across the site. Changes go live as soon as you save."
      />
      <Card>
        <SettingsForm settings={settings} />
      </Card>
    </>
  );
}
