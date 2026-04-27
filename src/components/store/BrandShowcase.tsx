import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";

interface BrandShowcaseProps {
  brands: { name: string; count: number; cover?: string }[];
}

export const BrandShowcase = ({ brands }: BrandShowcaseProps) => {
  return (
    <section className="container py-12 md:py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            <Tag className="h-3 w-3" /> Explora por marca
          </div>
          <h2 className="mt-3 font-display text-3xl font-black text-foreground md:text-4xl">
            Nuestras marcas
          </h2>
        </div>
        <Link
          to="/marcas"
          className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex"
        >
          Ver todas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {brands.slice(0, 6).map((brand) => (
          <Link
            key={brand.name}
            to={`/marca/${encodeURIComponent(brand.name)}`}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-card shadow-sm transition-spring hover:-translate-y-1 hover:border-accent/60 hover:shadow-elegant"
          >
            {brand.cover && (
              <img
                src={brand.cover}
                alt={brand.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-spring group-hover:scale-110 group-hover:opacity-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                {brand.count} productos
              </span>
              <span className="font-display text-lg font-black leading-tight text-primary-foreground">
                {brand.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
