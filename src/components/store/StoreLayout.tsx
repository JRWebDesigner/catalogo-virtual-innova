import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { ProductForm } from "./ProductForm";
import { useProducts } from "@/context/ProductsContext";
import { Product } from "@/types/product";

interface StoreLayoutProps {
  children: (api: { openEdit: (p: Product) => void }) => ReactNode;
  search?: string;
  onSearch?: (v: string) => void;
}

export const StoreLayout = ({ children, search, onSearch }: StoreLayoutProps) => {
  const { addProduct, updateProduct } = useProducts();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

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
      <Header onAdd={openNew} search={search} onSearch={onSearch} />
      <main>{children({ openEdit })}</main>

      <footer className="mt-16 border-t border-border bg-secondary/40">
        <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted-foreground md:flex-row">
          <p>
            <span className=" font-black text-primary">tienda virtual</span> · Tienda virtual profesional
          </p>
          <p className="text-xs">Listo para conectarse a tu base de datos.</p>
        </div>
      </footer>

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSave={(data, id) => (id ? updateProduct(id, data) : addProduct(data))}
      />
    </div>
  );
};
