const BRANDS = [
  "Nordkap",
  "Velocore",
  "Aeon Sports",
  "Fjell & Co",
  "Ridgeline",
  "Summit Athletics",
  "Torque Energy",
  "Pulsewear",
  "Granite Nutrition",
  "Vantage Gear",
];

/**
 * Trust-signal marquee under the hero — scrolling wordmarks of the kind of
 * brands the platform is built for. Duplicated once so the loop is seamless.
 */
export function BrandMarquee() {
  const stream = [...BRANDS, ...BRANDS];
  return (
    <div className="relative overflow-hidden border-t border-white/10 bg-panel/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-panel to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-panel to-transparent" />
      <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
        Trusted by brands like
      </p>
      <div className="flex w-max animate-marquee items-center gap-14">
        {stream.map((b, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-white/40 transition hover:text-white/70"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
