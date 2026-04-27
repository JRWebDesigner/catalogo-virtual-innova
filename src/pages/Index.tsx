import { useMemo, useState } from "react";
import { Header } from "@/components/store/Header";
import { Hero } from "@/components/store/Hero";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductForm } from "@/components/store/ProductForm";
import { sampleProducts } from "@/data/sampleProducts";
import { NewProduct, Product } from "@/types/product";
import { PackageOpen } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q),
    );
  }, [products, search]);

  const stats = useMemo(
    () => ({
      total: products.length,
      inStock: products.filter((p) => p.stock > 0).length,
      brands: new Set(products.map((p) => p.brand)).size,
    }),
    [products],
  );

  const handleSave = (data: NewProduct, id?: string) => {
    if (id) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    } else {
      const newProduct: Product = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Producto eliminado");
  };

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAdd={openNew} search={search} onSearch={setSearch} />
      <main>
        <Hero total={stats.total} inStock={stats.inStock} brands={stats.brands} />

        <section className="container py-12 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-black text-foreground md:text-4xl">
                Catálogo
              </h2>
              <p className="mt-1 text-muted-foreground">
                {filtered.length} producto{filtered.length !== 1 && "s"}
                {search && ` · resultado para "${search}"`}
              </p>
            </div>
            <div className="hidden h-1 flex-1 max-w-xs rounded-full bg-gradient-accent md:block" />
          </div>

          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-24 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/30 text-primary">
                <PackageOpen className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">Sin resultados</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                No encontramos productos con esa búsqueda. Intenta con otro término o agrega uno nuevo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="border-t border-border bg-secondary/40">
          <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted-foreground md:flex-row">
            <p>
              <span className="font-display font-black text-primary">Verdelima</span> · Tienda virtual profesional
            </p>
            <p className="text-xs">Listo para conectarse a tu base de datos.</p>
          </div>
        </footer>
      </main>

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;
