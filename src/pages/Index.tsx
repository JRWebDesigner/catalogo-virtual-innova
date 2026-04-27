import { Link } from "react-router-dom";
import { ArrowRight, PackageOpen } from "lucide-react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { Hero } from "@/components/store/Hero";
import { ProductCard } from "@/components/store/ProductCard";
import { BrandShowcase } from "@/components/store/BrandShowcase";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { products, featured, brands, deleteProduct } = useProducts();
  const inStock = products.filter((p) => p.stock > 0).length;

  return (
    <StoreLayout>
      {({ openEdit }) => (
        <>
          <Hero total={products.length} inStock={inStock} brands={brands.length} />

          <section className="container py-12 md:py-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Destacados
                </div>
                <h2 className="mt-3 font-display text-3xl font-black text-foreground md:text-4xl">
                  Lo más reciente
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Los últimos {featured.length} productos cargados al catálogo.
                </p>
              </div>
              <Link to="/productos" className="hidden md:block">
                <Button variant="outline" className="gap-2 rounded-full">
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {featured.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {featured.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onEdit={openEdit}
                    onDelete={deleteProduct}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center md:hidden">
              <Link to="/productos">
                <Button variant="outline" className="gap-2 rounded-full">
                  Ver todos los productos <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>

          <BrandShowcase brands={brands} />
        </>
      )}
    </StoreLayout>
  );
};

const EmptyState = () => (
  <div className="grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-24 text-center">
    <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/30 text-primary">
      <PackageOpen className="h-7 w-7" />
    </div>
    <h3 className="mt-4 font-display text-xl font-bold">Aún no hay productos</h3>
    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
      Agrega tu primer producto desde el botón "Nuevo producto".
    </p>
  </div>
);

export default Index;
