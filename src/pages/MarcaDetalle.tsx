import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PackageOpen } from "lucide-react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { ProductCard } from "@/components/store/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 24;

const MarcaDetalle = () => {
  const { brand: brandParam } = useParams<{ brand: string }>();
  const brand = decodeURIComponent(brandParam ?? "");
  const { products, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const brandProducts = useMemo(
    () => products.filter((p) => p.brand === brand),
    [products, brand],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return brandProducts;
    return brandProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q),
    );
  }, [brandProducts, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const cover = brandProducts[0]?.image;

  return (
    <StoreLayout search={search} onSearch={(v) => { setSearch(v); setPage(1); }}>
      {({ openEdit }) => (
        <>
          <section className="relative overflow-hidden bg-gradient-hero">
            {cover && (
              <img
                src={cover}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
            <div className="container relative py-12 md:py-16">
              <Link
                to="/marcas"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80 transition-base hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Todas las marcas
              </Link>
              <h1 className="mt-4 font-display text-5xl font-black text-primary-foreground md:text-6xl">
                {brand}
              </h1>
              <p className="mt-2 text-primary-foreground/80">
                {brandProducts.length} producto{brandProducts.length !== 1 && "s"} de esta marca
              </p>
            </div>
          </section>

          <section className="container py-10">
            {filtered.length === 0 ? (
              <div className="grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-24 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/30 text-primary">
                  <PackageOpen className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">Sin productos</h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  No hay productos para mostrar en esta marca.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {current.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onEdit={openEdit}
                      onDelete={deleteProduct}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Anterior
                    </Button>
                    <div className="px-3 text-sm font-semibold text-muted-foreground">
                      Página <span className="text-foreground">{page}</span> de {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </>
            )}
          </section>
        </>
      )}
    </StoreLayout>
  );
};

export default MarcaDetalle;
