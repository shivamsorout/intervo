import { useAuth } from "@/hooks/useAuth";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const widgets = [
  { label: "Topics completed", value: "0", tone: "primary" as const },
  { label: "Current streak", value: "0 days", tone: "success" as const },
  { label: "Bookmarked topics", value: "0", tone: "neutral" as const },
];

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-[var(--font-display)] text-2xl font-semibold">
        Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Your prep content, progress, and revision tools will live here.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {widgets.map((widget) => (
          <Card key={widget.label}>
            <CardBody>
              <Badge tone={widget.tone}>{widget.label}</Badge>
              <p className="mt-3 text-3xl font-semibold">{widget.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardBody>
          <CardTitle>Coming next</CardTitle>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Phase 1 wires up the Prep platform: Read View, PPT View, flash cards, mind maps, revision sheets, and
            company-wise question banks.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
