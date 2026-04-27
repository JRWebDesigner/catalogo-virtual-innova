import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { ProductCard } from "@/components/store/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE = 24;

const Productos = () => {
  const { products, brands, deleteProduct } = useProducts();
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get("q") ?? "");
  const [brand, setBrand] = useState(params.get("marca") ?? "all");
  const [stockFilter, setStockFilter] = useState(params.get("stock") ?? "all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set("q", search);
    if (brand !== "all") next.set("marca", brand);
    if (stockFilter !== "all") next.set("stock", stockFilter);
    setParams(next, { replace: true });
    setPage(1);
  }, [search, brand, stockFilter, setParams]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (brand !== "all" && p.brand !== brand) return false;
      if (stockFilter === "in" && p.stock <= 0) return false;
      if (stockFilter === "out" && p.stock > 0) return false;
      if (stockFilter === "low" && (p.stock === 0 || p.stock >= 10)) return false;
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.brand.toLowerCase().includes(q) &&
        !p.code.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [products, search, brand, stockFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <StoreLayout search={search} onSearch={setSearch}>
      {({ openEdit }) => (
        <section className="container py-10 md:py-14">
          <div className="mb-6">
            <h1 className="font-display text-4xl font-black text-foreground md:text-5xl">
              Todos los productos
            </h1>
            <p className="mt-1 text-muted-foreground">
              {filtered.length} producto{filtered.length !== 1 && "s"} en catálogo
            </p>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Marca
              </span>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger className="h-10 w-[180px] rounded-full bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las marcas</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b.name} value={b.name}>
                      {b.name} ({b.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Stock
              </span>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="h-10 w-[160px] rounded-full bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="in">Disponible</SelectItem>
                  <SelectItem value="low">Bajo (&lt;10)</SelectItem>
                  <SelectItem value="out">Agotado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(brand !== "all" || stockFilter !== "all" || search) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setBrand("all");
                  setStockFilter("all");
                }}
                className="ml-auto rounded-full"
              >
                Limpiar filtros
              </Button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-24 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/30 text-primary">
                <PackageOpen className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">Sin resultados</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Ajusta los filtros o intenta con otro término de búsqueda.
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
      )}
    </StoreLayout>
  );
};

export default Productos;
