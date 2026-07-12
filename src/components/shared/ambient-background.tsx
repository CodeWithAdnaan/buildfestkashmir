/**
 * Layered ambient backdrop — gradient mesh + dot grid, fixed behind all
 * content. This is what gives the site the "alive" quality the Vercel /
 * Linear / Convex reference sites have, instead of flat editorial white
 * space. Rendered once, low in the DOM, pointer-events disabled.
 */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <div className="absolute inset-0 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="glow-saffron absolute -top-32 right-[8%] h-[560px] w-[560px] rounded-full blur-3xl" />
      <div className="glow-pine absolute top-[18%] -left-40 h-[520px] w-[520px] rounded-full blur-3xl" />
      <div className="glow-pine absolute bottom-[-10%] right-[15%] h-[480px] w-[480px] rounded-full opacity-60 blur-3xl" />
    </div>
  );
}
