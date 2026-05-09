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
  const { products, deleteProduct } = useProducts();
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get("q") ?? "");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set("q", search);
    setParams(next, { replace: true });
    setPage(1);
  }, [search, setParams]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.code.toLowerCase().includes(q) &&
        !p.capacity.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [products, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <StoreLayout search={search} onSearch={setSearch}>
      {({ openEdit, openImport }) => (
        <section className="container py-10 md:py-14">
          <div className="mb-6">
            <h1 className=" text-4xl font-black text-foreground md:text-5xl">
              Todos los productos
            </h1>
            <p className="mt-1 text-muted-foreground">
              {filtered.length} producto{filtered.length !== 1 && "s"} en catálogo
            </p>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-3">
            {search && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearch("")}
                className="ml-auto rounded-full"
              >
                Limpiar búsqueda
              </Button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-24 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/30 text-primary">
                <PackageOpen className="h-7 w-7" />
              </div>
              <h3 className="mt-4  text-xl font-bold">Sin resultados</h3>
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
