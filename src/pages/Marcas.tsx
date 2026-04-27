import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { useProducts } from "@/context/ProductsContext";

const Marcas = () => {
  const { brands } = useProducts();

  return (
    <StoreLayout>
      {() => (
        <section className="container py-10 md:py-14">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <Tag className="h-3 w-3" /> Marcas
            </div>
            <h1 className="mt-3 font-display text-4xl font-black text-foreground md:text-5xl">
              Todas las marcas
            </h1>
            <p className="mt-1 text-muted-foreground">
              {brands.length} marca{brands.length !== 1 && "s"} en el catálogo
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/marca/${encodeURIComponent(brand.name)}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-gradient-card shadow-sm transition-spring hover:-translate-y-1 hover:border-accent/60 hover:shadow-elegant"
              >
                {brand.cover && (
                  <img
                    src={brand.cover}
                    alt={brand.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-spring group-hover:scale-110 group-hover:opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                    {brand.count} productos
                  </span>
                  <span className="mt-1 font-display text-2xl font-black leading-tight text-primary-foreground">
                    {brand.name}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground/80 transition-base group-hover:text-accent">
                    Ver productos <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </StoreLayout>
  );
};

export default Marcas;
