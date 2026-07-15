import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCheck, TrendingUp, Inbox, Handshake } from "lucide-react";

export const metadata = { title: "Athlete dashboard" };

export default function AthleteDashboard() {
  const stats = [
    { label: "Profile views", value: "1,284", delta: "+12%", icon: TrendingUp },
    { label: "Open inquiries", value: "7", delta: "+3", icon: Inbox },
    { label: "Active deals", value: "2", delta: "$15K", icon: Handshake },
  ];
  return (
    <div className="px-6 py-8 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-extrabold">Overview</h1>
            <Badge className="border-brand/20 bg-brand-wash text-brand">
              <BadgeCheck className="h-3 w-3" /> Verified
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted">Here's how your profile is performing.</p>
        </div>
        <Button variant="outline" size="sm">Edit profile</Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{s.label}</span>
              <s.icon className="h-4 w-4 text-brand" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="stat-num text-3xl font-bold">{s.value}</span>
              <span className="mb-1 font-mono text-xs text-brand">{s.delta}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6" id="inquiries">
          <h2 className="font-display text-lg font-bold">Recent inquiries</h2>
          <div className="mt-4 divide-y divide-line">
            {[
              ["Northwind Apparel", "Spring campaign — 3 posts", "2h ago"],
              ["Volt Energy", "Event appearance", "1d ago"],
              ["Peak Nutrition", "Ambassador program", "3d ago"],
            ].map(([brand, subject, time]) => (
              <div key={brand} className="flex items-center justify-between py-3.5">
                <div>
                  <div className="text-sm font-semibold">{brand}</div>
                  <div className="text-sm text-muted">{subject}</div>
                </div>
                <span className="font-mono text-xs text-muted">{time}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6" id="payouts">
          <h2 className="font-display text-lg font-bold">Payouts</h2>
          <p className="mt-1 text-sm text-muted">Connect Stripe to receive payments.</p>
          <div className="mt-5 rounded-xl border border-dashed border-line p-5 text-center">
            <div className="stat-num text-2xl font-bold">$0.00</div>
            <div className="text-xs text-muted">available balance</div>
            <Button size="sm" className="mt-4 w-full">Set up payouts</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
