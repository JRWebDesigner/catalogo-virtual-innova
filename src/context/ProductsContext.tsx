import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { NewProduct, Product } from "@/types/product";
import { sampleProducts } from "@/data/sampleProducts";
import { toast } from "sonner";

interface ProductsContextValue {
  products: Product[];
  featured: Product[];
  brands: { name: string; count: number; cover?: string }[];
  addProduct: (data: NewProduct) => void;
  updateProduct: (id: string, data: NewProduct) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  const value = useMemo<ProductsContextValue>(() => {
    const brandsMap = new Map<string, { count: number; cover?: string }>();
    products.forEach((p) => {
      const entry = brandsMap.get(p.brand) ?? { count: 0, cover: p.image };
      entry.count += 1;
      if (!entry.cover && p.image) entry.cover = p.image;
      brandsMap.set(p.brand, entry);
    });

    return {
      products,
      featured: products.slice(0, 10),
      brands: Array.from(brandsMap.entries())
        .map(([name, v]) => ({ name, count: v.count, cover: v.cover }))
        .sort((a, b) => b.count - a.count),
      addProduct: (data) => {
        const newProduct: Product = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        setProducts((prev) => [newProduct, ...prev]);
      },
      updateProduct: (id, data) => {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
      },
      deleteProduct: (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Producto eliminado");
      },
    };
  }, [products]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
};
