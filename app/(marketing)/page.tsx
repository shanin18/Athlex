import Link from "next/link";
import { ArrowRight, BadgeCheck, Search, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTicker } from "@/components/marketing/stat-ticker";

const FEATURED = [
  { name: "Sana Ito", sport: "Surfing", reach: "3.2M", loc: "Lisbon, PT", rate: "$12K", verified: true },
  { name: "Maya Okonkwo", sport: "Track & Field", reach: "2.4M", loc: "London, UK", rate: "$8K", verified: true },
  { name: "Tariq Bello", sport: "Basketball", reach: "1.9M", loc: "Lagos, NG", rate: "$7K", verified: true },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — the one bold, dark moment */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #1b39ff 0%, transparent 70%)" }}
        />
        <div className="container-x relative grid gap-14 pb-16 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-24 lg:pt-28">
          <div className="animate-fade-up">
            <span className="eyebrow text-white/50">Sports sponsorship, measured</span>
            <h1 className="display mt-5 text-[clamp(2.6rem,6.5vw,5.2rem)]">
              Every athlete has a
              <br />
              number. We put a
              <br />
              <span className="text-[#7d92ff]">brand behind it.</span>
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/60">
              Athllo is the marketplace where athletes showcase their real reach and brands
              find, vet, and sponsor the right talent — with secure payments built in.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup">
                <Button size="lg">
                  Claim your profile <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  Browse athletes
                </Button>
              </Link>
            </div>
          </div>

          {/* Scoreboard card */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lift backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Live reach index
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#39e08e]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#39e08e]" />
                  updating
                </span>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="stat-num text-6xl font-bold leading-none">14,208</div>
                  <div className="mt-2 text-sm text-white/50">verified athletes listed</div>
                </div>
                <div className="text-right">
                  <div className="stat-num text-2xl font-bold text-[#7d92ff]">$4.6M</div>
                  <div className="mt-1 text-xs text-white/40">deals facilitated</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                {[
                  ["48", "sports"],
                  ["112", "countries"],
                  ["9,300", "brands"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="stat-num text-lg font-bold">{n}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <StatTicker />
      </section>

      {/* HOW IT WORKS */}
      <section className="container-x py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            From discovery to deal, without the middlemen.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Search,
              step: "01",
              title: "Discover on merit",
              body: "Brands filter by sport, location, budget, and real audience reach — not just who they already know.",
            },
            {
              icon: Zap,
              step: "02",
              title: "Connect directly",
              body: "Send an inquiry or post an opportunity. Athletes control their terms and respond on their own time.",
            },
            {
              icon: Wallet,
              step: "03",
              title: "Get paid securely",
              body: "Fund a deal through Stripe. Athletes are paid out on completion — Athllo handles the plumbing.",
            },
          ].map((f) => (
            <Card key={f.step} className="p-7">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-wash text-brand">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="stat-num text-sm font-bold text-line">{f.step}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURED ATHLETES */}
      <section className="border-y border-line bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow">Featured talent</span>
              <h2 className="display mt-4 text-4xl md:text-5xl">On the rise this week</h2>
            </div>
            <Link href="/search" className="hidden md:block">
              <Button variant="outline">
                See all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((a) => (
              <Card key={a.name} className="overflow-hidden transition-shadow hover:shadow-lift">
                <div className="relative h-44 bg-gradient-to-br from-ink to-[#1a2540]">
                  <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 70% 20%, #1b39ff55, transparent 60%)" }} />
                  <span className="absolute left-4 top-4 font-mono text-[11px] uppercase tracking-widest text-white/50">
                    {a.sport}
                  </span>
                  <div className="absolute bottom-4 left-4">
                    <div className="stat-num text-3xl font-bold text-white">{a.reach}</div>
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
                    <span className="stat-num text-sm font-bold">{a.rate}<span className="font-sans font-normal text-muted"> /campaign</span></span>
                    <Link href="/search" className="text-sm font-medium text-brand hover:text-brand-ink">
                      View →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TWO SIDES */}
      <section className="container-x grid gap-5 py-20 md:grid-cols-2 md:py-28" id="for-athletes">
        <Card className="flex flex-col justify-between p-9">
          <div>
            <Badge className="border-brand/20 bg-brand-wash text-brand">For athletes</Badge>
            <h2 className="display mt-5 text-3xl md:text-4xl">Turn your reach into revenue.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Build a profile that proves your value, get verified, and let brands come to you.
              Set your rate, control your terms, keep more of every deal.
            </p>
          </div>
          <Link href="/signup" className="mt-8">
            <Button>Create athlete profile <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </Card>
        <Card className="flex flex-col justify-between p-9" id="for-brands">
          <div>
            <Badge className="border-energy/20 bg-energy/10 text-energy">For brands</Badge>
            <h2 className="display mt-5 text-3xl md:text-4xl">Find talent that actually fits.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Search verified athletes by sport, audience, and budget. Vet real reach, start a
              conversation, and pay securely — all in one place.
            </p>
          </div>
          <Link href="/signup" className="mt-8">
            <Button variant="ink">Start sponsoring <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </Card>
      </section>

      {/* CTA */}
      <section className="container-x pb-24" id="contact">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-white md:py-20">
          <div aria-hidden className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 50% 0%, #1b39ff44, transparent 55%)" }} />
          <div className="relative">
            <h2 className="display mx-auto max-w-2xl text-4xl md:text-5xl">
              The next deal is one profile away.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">
              Join athletes and brands already building on Athllo.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/signup">
                <Button size="lg">Get started free</Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  See pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
