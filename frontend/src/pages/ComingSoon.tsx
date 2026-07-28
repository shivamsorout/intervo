import { Card, CardBody, CardTitle } from "@/components/ui/Card";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <Card>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            This is part of Phase 1 (Core Prep Platform) and isn't built yet.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
