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
          <div className="mb-8 rounded-[32px] border border-border/70 bg-gradient-to-br from-white/80 via-slate-50/80 to-white/90 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 inline-flex rounded-full border border-[#db070b]/15 bg-[#db070b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#db070b]">
                  Catálogo moderno
                </p>
                <h1 className="text-4xl font-black text-foreground sm:text-5xl">
                  Productos disponibles para tu laboratorio
                </h1>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
                  Busca por nombre, código o capacidad. Aquí encuentras todo lo necesario con estilo y resultados rápidos.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-3xl border border-border/70 bg-slate-950/5 p-4 shadow-sm backdrop-blur-xl">
            <div>
              <p className="text-sm font-semibold text-foreground">Filtros activos</p>
              <p className="text-sm text-muted-foreground">
                {search ? `Buscando: “${search}”` : "Sin búsqueda activa"}
              </p>
            </div>
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
            <div className="grid place-items-center rounded-[36px] border border-dashed border-border bg-[#f8fafc] p-16 text-center shadow-sm">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#0057be]/10 text-[#0057be]">
                <PackageOpen className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-black text-foreground">Sin resultados</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Ajusta la búsqueda, borra el filtro o agrega nuevos productos desde la sección de administración.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full px-5 py-3"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Anterior
                  </Button>
                  <div className="px-4 py-3 text-sm font-semibold text-muted-foreground rounded-full border border-border/70 bg-white/70">
                    Página <span className="text-foreground">{page}</span> de {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full px-5 py-3"
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
