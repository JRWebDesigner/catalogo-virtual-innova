import { Package, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  total: number;
}

export const Hero = ({ total }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-red-400/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-up">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Todo lo necesario para tu laboratorio
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-lg">
                Descubre nuestra amplia selección de productos de alta calidad. 
                Desde equipos especializados hasta suministros esenciales.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/productos" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-8 bg-white text-red-600 hover:bg-gray-100 font-bold text-base gap-2 group">
                  Explorar Productos
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
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
