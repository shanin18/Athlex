import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/marketing/site-nav";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MapPin, Instagram, Youtube } from "lucide-react";

// Demo data — in production this is fetched from Supabase by slug (ISR).
const DB: Record<string, any> = {
  "sana-ito": {
    name: "Sana Ito",
    sport: "Surfing",
    loc: "Lisbon, Portugal",
    headline: "3x national champion. Ocean advocate.",
    bio: "Professional surfer competing on the world tour, with a community built around sustainable ocean sports and coastal conservation.",
    reach: "3.2M",
    rate: "$12,000",
    verified: true,
    stats: [["Instagram", "1.8M"], ["TikTok", "980K"], ["YouTube", "420K"]],
    achievements: ["3x National Champion", "WSL Tour competitor", "2M+ engaged community"],
  },
  "maya-okonkwo": {
    name: "Maya Okonkwo",
    sport: "Track & Field",
    loc: "London, UK",
    headline: "Sprinter. Two-time European medalist.",
    bio: "400m specialist and mentor to young athletes, partnering with brands that back the next generation of track talent.",
    reach: "2.4M",
    rate: "$8,000",
    verified: true,
    stats: [["Instagram", "1.4M"], ["TikTok", "760K"], ["YouTube", "240K"]],
    achievements: ["2x European medalist", "National record holder", "Youth mentor program"],
  },
};

export function generateStaticParams() {
  return Object.keys(DB).map((slug) => ({ slug }));
}

export default async function AthleteProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = DB[slug];
  if (!a) notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden bg-ink text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(circle at 80% 10%, #1b39ff55, transparent 55%)" }}
          />
          <div className="container-x relative py-14">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              {a.sport}
            </span>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
              <div>
                <h1 className="display flex items-center gap-3 text-5xl md:text-6xl">
                  {a.name}
                  {a.verified && <BadgeCheck className="h-8 w-8 text-[#7d92ff]" />}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-white/60">
                  <MapPin className="h-4 w-4" /> {a.loc}
                </p>
                <p className="mt-2 max-w-lg text-lg text-white/80">{a.headline}</p>
              </div>
              <div className="text-right">
                <div className="stat-num text-5xl font-bold text-[#7d92ff]">{a.reach}</div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                  total reach
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-x grid gap-6 py-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <Card className="p-7">
              <h2 className="font-display text-xl font-bold">About</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{a.bio}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {a.achievements.map((ac: string) => (
                  <Badge key={ac} className="border-brand/20 bg-brand-wash text-brand">
                    {ac}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-7">
              <h2 className="font-display text-xl font-bold">Audience</h2>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {a.stats.map(([platform, count]: [string, string]) => (
                  <div key={platform} className="rounded-xl border border-line p-4">
                    <div className="flex items-center gap-1.5 text-muted">
                      {platform === "Instagram" && <Instagram className="h-3.5 w-3.5" />}
                      {platform === "YouTube" && <Youtube className="h-3.5 w-3.5" />}
                      <span className="font-mono text-[10px] uppercase tracking-widest">
                        {platform}
                      </span>
                    </div>
                    <div className="stat-num mt-2 text-2xl font-bold">{count}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sticky sponsor CTA */}
          <div>
            <Card className="sticky top-24 p-7">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">Starting rate</span>
                <span className="stat-num text-2xl font-bold">{a.rate}</span>
              </div>
              <p className="mt-1 text-xs text-muted">per campaign · negotiable</p>
              <Link href="/signup" className="mt-5 block">
                <Button className="w-full">Send an inquiry</Button>
              </Link>
              <Link href="/signup" className="mt-2 block">
                <Button variant="outline" className="w-full">
                  Save to shortlist
                </Button>
              </Link>
              <p className="mt-4 text-center text-xs text-muted">
                Payments handled securely via Stripe
              </p>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
