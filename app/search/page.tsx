import Link from "next/link";
import { SiteNav } from "@/components/marketing/site-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeCheck, SlidersHorizontal } from "lucide-react";

export const metadata = { title: "Discover athletes" };

const ATHLETES = [
  { slug: "sana-ito", name: "Sana Ito", sport: "Surfing", reach: "3.2M", loc: "Lisbon, PT", rate: "$12K", verified: true },
  { slug: "maya-okonkwo", name: "Maya Okonkwo", sport: "Track & Field", reach: "2.4M", loc: "London, UK", rate: "$8K", verified: true },
  { slug: "tariq-bello", name: "Tariq Bello", sport: "Basketball", reach: "1.9M", loc: "Lagos, NG", rate: "$7K", verified: true },
  { slug: "aisha-karim", name: "Aisha Karim", sport: "Climbing", reach: "1.1M", loc: "Dubai, AE", rate: "$5K", verified: false },
  { slug: "diego-ramos", name: "Diego Ramos", sport: "Football", reach: "890K", loc: "Madrid, ES", rate: "$4K", verified: true },
  { slug: "leo-andersen", name: "Leo Andersen", sport: "Cycling", reach: "640K", loc: "Oslo, NO", rate: "$3K", verified: false },
];

const SPORTS = ["All sports", "Surfing", "Track & Field", "Basketball", "Climbing", "Football", "Cycling"];

export default function SearchPage() {
  return (
    <>
      <SiteNav />
      <div className="container-x py-10">
        <h1 className="display text-3xl md:text-4xl">Discover athletes</h1>
        <p className="mt-2 text-muted">Filter by sport, reach, budget, and location.</p>

        {/* Filter bar */}
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-card">
          <Input placeholder="Search by name or sport…" className="max-w-xs flex-1" />
          <select className="h-11 rounded-xl border border-line bg-surface px-3 text-[15px] text-ink">
            {SPORTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select className="h-11 rounded-xl border border-line bg-surface px-3 text-[15px] text-ink">
            <option>Any reach</option>
            <option>500K+</option>
            <option>1M+</option>
            <option>3M+</option>
          </select>
          <Button variant="outline" size="sm" className="ml-auto">
            <SlidersHorizontal className="h-4 w-4" /> More filters
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {ATHLETES.length} athletes
          </span>
          <select className="h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink-soft">
            <option>Sort: Relevance</option>
            <option>Sort: Reach</option>
            <option>Sort: Recently active</option>
          </select>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ATHLETES.map((a) => (
            <Link key={a.slug} href={`/athletes/${a.slug}`}>
              <Card className="overflow-hidden transition-shadow hover:shadow-lift">
                <div className="relative h-40 bg-gradient-to-br from-ink to-[#1a2540]">
                  <span className="absolute left-4 top-4 font-mono text-[11px] uppercase tracking-widest text-white/50">
                    {a.sport}
                  </span>
                  <div className="absolute bottom-4 left-4">
                    <div className="stat-num text-2xl font-bold text-white">{a.reach}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      total reach
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-lg font-bold">{a.name}</h3>
                    {a.verified && <BadgeCheck className="h-4 w-4 text-brand" />}
                  </div>
                  <p className="text-sm text-muted">{a.loc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                    <span className="stat-num text-sm font-bold">
                      {a.rate}
                      <span className="font-sans font-normal text-muted"> /campaign</span>
                    </span>
                    {!a.verified && <Badge>Unverified</Badge>}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
