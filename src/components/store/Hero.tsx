import { Package, Sparkles, TrendingUp } from "lucide-react";

interface HeroProps {
  total: number;
  inStock: number;
  brands: number;
}

export const Hero = ({ total, inStock, brands }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-30 mix-blend-overlay"
           style={{ backgroundImage: "radial-gradient(circle at 20% 30%, hsl(75 85% 55% / 0.6), transparent 50%), radial-gradient(circle at 80% 70%, hsl(345 80% 50% / 0.5), transparent 50%)" }} />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative py-16 md:py-24">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Tienda virtual profesional
          </div>
          <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] text-primary-foreground md:text-7xl">
            Tu catálogo,
            <span className="block bg-gradient-to-r from-accent via-accent-glow to-accent bg-clip-text text-transparent">
              vivo y vibrante.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
            Carga productos con imagen, capacidad, marca, código y stock.
            Gestiona todo desde un solo lugar con una experiencia rápida y elegante.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-3 md:max-w-xl md:gap-4">
          <StatCard icon={Package} label="Productos" value={total} />
          <StatCard icon={TrendingUp} label="En stock" value={inStock} />
          <StatCard icon={Sparkles} label="Marcas" value={brands} />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: number;
}) => (
  <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4 backdrop-blur-md transition-spring hover:scale-[1.02] hover:bg-primary-foreground/15 md:p-5">
    <Icon className="h-5 w-5 text-accent" strokeWidth={2.5} />
    <div className="mt-3 font-display text-3xl font-black text-primary-foreground md:text-4xl">
      {value}
    </div>
    <div className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
      {label}
    </div>
  </div>
);
