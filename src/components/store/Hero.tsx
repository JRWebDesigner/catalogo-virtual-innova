import { Package, Sparkles, TrendingUp } from "lucide-react";

interface HeroProps {
  total: number;
}

export const Hero = ({ total }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative py-16 md:py-24">
        <div className="max-w-3xl animate-fade-up">
          
          
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 md:max-w-xl md:gap-4">
          <StatCard icon={Package} label="Productos en catálogo" value={total} />
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
    <div className="mt-3  text-3xl font-black text-primary-foreground md:text-4xl">
      {value}
    </div>
    <div className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
      {label}
    </div>
  </div>
);
