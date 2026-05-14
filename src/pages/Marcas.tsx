import { useMemo, useState } from "react";
import { PackageOpen, ArrowLeft } from "lucide-react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { ProductCard } from "@/components/store/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 24;

const Marcas = () => {
  const { products, deleteProduct } = useProducts();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Obtener todas las marcas únicas y contar productos
  const brands = useMemo(() => {
    const brandMap = new Map<string, number>();
    products.forEach((p) => {
      const brand = p.brand.trim();
      if (brand) {
        brandMap.set(brand, (brandMap.get(brand) || 0) + 1);
      }
    });
    return Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // Filtrar productos por marca y búsqueda
  const filtered = useMemo(() => {
    let result = products;

    if (selectedBrand) {
      result = result.filter((p) => p.brand.trim() === selectedBrand);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.capacity.toLowerCase().includes(q)
        );
      });
    }

    return result;
  }, [products, selectedBrand, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <StoreLayout>
      {({ openEdit }) => (
        <section className="container py-10 md:py-14">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-foreground md:text-5xl">
              Marcas
            </h1>
            <p className="mt-1 text-muted-foreground">
              Explora productos por marca
            </p>
          </div>

          {/* Lista de marcas */}
          {!selectedBrand ? (
            <>
              {brands.length === 0 ? (
                <div className="grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-24 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/30 text-primary">
                    <PackageOpen className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Sin marcas disponibles</h3>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Aún no hay productos registrados en el catálogo.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {brands.map((brand) => (
                    <button
                      key={brand.name}
                      onClick={() => {
                        setSelectedBrand(brand.name);
                        setSearch("");
                        setPage(1);
                      }}
                      className="group relative flex flex-col items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-card to-secondary p-8 transition-spring hover:-translate-y-1 hover:border-accent/50 hover:shadow-elegant"
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-foreground">
                          {brand.name}
                        </h3>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Encabezado con marca seleccionada */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedBrand}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedBrand(null);
                    setSearch("");
                    setPage(1);
                  }}
                  className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver a marcas
                </button>
              </div>

              {/* Búsqueda dentro de la marca */}
              <div className="mb-6">
                <Input
                  placeholder="Buscar productos en esta marca..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="max-w-sm"
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                    }}
                    className="ml-2 mt-3 rounded-full"
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </div>

              {/* Productos de la marca */}
              {filtered.length === 0 ? (
                <div className="grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-24 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/30 text-primary">
                    <PackageOpen className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Sin resultados</h3>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    No encontramos productos que coincidan con tu búsqueda.
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
                        Página <span className="text-foreground">{page}</span> de{" "}
                        {totalPages}
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
            </>
          )}
        </section>
      )}
    </StoreLayout>
  );
};

export default Marcas;
