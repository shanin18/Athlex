import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Megaphone, Handshake } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Brand dashboard" };

export default function SponsorDashboard() {
  return (
    <div className="px-6 py-8 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Overview</h1>
          <p className="mt-1 text-sm text-muted">Find talent and manage your campaigns.</p>
        </div>
        <Link href="/search"><Button size="sm"><Search className="h-4 w-4" /> Find athletes</Button></Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Shortlisted", value: "12", icon: Search },
          { label: "Open opportunities", value: "3", icon: Megaphone },
          { label: "Active deals", value: "5", icon: Handshake },
        ].map((s) => (
          <Card key={s.label} className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{s.label}</span>
              <s.icon className="h-4 w-4 text-brand" />
            </div>
            <div className="stat-num mt-3 text-3xl font-bold">{s.value}</div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6">
        <h2 className="font-display text-lg font-bold">Your opportunities</h2>
        <div className="mt-4 divide-y divide-line">
          {[
            ["Summer running campaign", "Track & Field", "8 applicants", "Open"],
            ["Brand ambassador — climbing", "Climbing", "3 applicants", "Open"],
            ["Product launch push", "Basketball", "Closed", "Filled"],
          ].map(([title, sport, apps, status]) => (
            <div key={title} className="flex items-center justify-between py-3.5">
              <div>
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-sm text-muted">{sport} · {apps}</div>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
