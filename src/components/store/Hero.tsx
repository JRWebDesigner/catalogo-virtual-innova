import { Package, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  total: number;
}

export const Hero = ({ total }: HeroProps) => {
  return (
    <section
      className="relative overflow-hidden bg-slate-950/95 py-24 sm:py-28"
      style={{
        backgroundImage:
          'radial-gradient(circle at 12% 18%, rgba(219,7,11,0.18), transparent 20%), radial-gradient(circle at 88% 12%, rgba(0,87,190,0.22), transparent 24%), linear-gradient(180deg, rgba(10,14,34,0.96), rgba(6,10,26,0.98))',
      }}
    >
      <div className="absolute inset-0 -z-10 opacity-90">
        <div className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-[#db070b]/15 blur-[90px]" />
        <div className="absolute -right-16 top-24 h-96 w-96 rounded-full bg-[#0057be]/15 blur-[110px]" />
        <div className="absolute left-1/2 top-1/4 h-[260px] w-[260px] -translate-x-1/2 rounded-full border border-white/10 bg-white/5 opacity-25 blur-2xl" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/5 opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent" />
      </div>

      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.95fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
              Todo para tu laboratorio
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Todo lo necesario para tu laboratorio,
                <span className="block text-[#db070b]">organizado y listo para usar.</span>
              </h1>
              <p className="max-w-2xl text-base text-white/75 sm:text-lg">
                Encuentra productos profesionales, repuestos y materiales con una experiencia clara, rápida y moderna.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/productos" className="inline-flex w-full items-center justify-center rounded-full bg-[#db070b] px-6 py-3 text-sm font-bold text-white shadow-[0_24px_80px_rgba(219,7,11,0.2)] transition hover:-translate-y-0.5 sm:w-auto">
                Explorar catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/80">
                {total} productos listos para ti
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={Package}
              title="Inventario claro"
              description="Organiza y encuentra todo el material de laboratorio en un solo lugar."
              gradient="from-[#db070b]/80 via-[#db070b]/30 to-[#0057be]/20"
            />
            <FeatureCard
              icon={Sparkles}
              title="Catálogo premium"
              description="Productos de calidad con una presentación moderna y fácil de navegar."
              gradient="from-[#0057be]/80 via-[#0057be]/30 to-[#db070b]/15"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Flujo eficiente"
              description="Busca rápido, administra mejor y mantén todo en orden para tu laboratorio."
              gradient="from-white/10 to-white/5"
            />
            <StatCard icon={Package} label="Productos" value={total} />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  gradient,
}: {
  icon: typeof Package;
  title: string;
  description: string;
  gradient: string;
}) => (
  <div className={`group rounded-2xl bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/20 p-6 hover:border-white/40 transition-all duration-300 hover:scale-105`}>
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-white/10 p-3 group-hover:bg-white/20 transition-colors">
        <Icon className="h-6 w-6 text-white" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-white text-lg">{title}</h3>
        <p className="text-sm text-white/70 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

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
