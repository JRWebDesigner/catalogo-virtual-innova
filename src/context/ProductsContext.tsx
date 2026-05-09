import { createContext, ReactNode, useContext, useMemo, useState, useEffect } from "react";
import { NewProduct, Product } from "@/types/product";
import { sampleProducts } from "@/data/sampleProducts";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface ProductsContextValue {
  products: Product[];
  featured: Product[];
  addProduct: (data: NewProduct) => Promise<void>;
  bulkAddProducts: (products: NewProduct[]) => Promise<void>;
  updateProduct: (id: string, data: NewProduct) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts); // ✅ Inicializar con sampleProducts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          setProducts(sampleProducts);
          toast.error(`No se pudieron cargar los productos: ${error.message}`);
        } else if (data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
          setProducts(sampleProducts);
        }
      } catch (err: any) {
        setProducts(sampleProducts);
        toast.error("Error de conexión con Supabase");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const value = useMemo<ProductsContextValue>(() => {
    return {
      products,
      featured: products.slice(0, 10),
      addProduct: async (data) => {
        const newProduct: Product = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        
        // Actualizar UI inmediatamente
        setProducts((prev) => [newProduct, ...prev]);
        
        try {
          const { error } = await supabase
            .from("products")
            .insert([{
              id: newProduct.id,
              name: data.name,
              image: data.image,
              code: data.code,
              capacity: data.capacity,
              brand: data.brand,
              created_at: newProduct.createdAt,
            }]);
          
          if (error) {
            toast.error(`Error al guardar: ${error.message || "Error desconocido"}`);
            // Revertir cambio en UI
            setProducts((prev) => prev.filter(p => p.id !== newProduct.id));
          } else {
            toast.success("Producto agregado");
          }
        } catch (err: any) {
          toast.error(`Error: ${err?.message || "No se pudo conectar a Supabase"}`);
          setProducts((prev) => prev.filter(p => p.id !== newProduct.id));
        }
      },
      bulkAddProducts: async (newProducts) => {
        const productsToAdd = newProducts.map(data => ({
          id: crypto.randomUUID(),
          ...data,
          createdAt: new Date().toISOString(),
        } as Product));
        
        // Actualizar UI inmediatamente
        setProducts((prev) => [...productsToAdd, ...prev]);
        
        try {
          const { error } = await supabase
            .from("products")
            .insert(
              productsToAdd.map((p) => ({
                id: p.id,
                name: p.name,
                image: p.image,
                code: p.code,
                capacity: p.capacity,
                brand: p.brand,
                created_at: p.createdAt,
              }))
            );
          
          if (error) {
            toast.error(`Error al importar: ${error.message || "Error desconocido"}`);
            // Revertir cambio en UI
            setProducts((prev) => prev.filter(p => !productsToAdd.some(np => np.id === p.id)));
            throw new Error(error.message);
          } else {
            toast.success(`${newProducts.length} producto${newProducts.length !== 1 ? "s" : ""} importado${newProducts.length !== 1 ? "s" : ""}`);
          }
        } catch (err: any) {
          toast.error(`Error: ${err?.message || "No se pudo conectar a Supabase"}`);
          setProducts((prev) => prev.filter(p => !productsToAdd.some(np => np.id === p.id)));
          throw err;
        }
      },
      updateProduct: async (id, data) => {
        const oldProduct = products.find(p => p.id === id);
        
        // Actualizar UI inmediatamente
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
        
        try {
          const { error } = await supabase
            .from("products")
            .update({
              name: data.name,
              image: data.image,
              code: data.code,
              capacity: data.capacity,
              brand: data.brand,
            })
            .eq("id", id);
          
          if (error) {
            toast.error(`Error: ${error.message || "Error al actualizar"}`);
            // Revertir cambio
            if (oldProduct) {
              setProducts((prev) => prev.map((p) => p.id === id ? oldProduct : p));
            }
          } else {
            toast.success("Producto actualizado");
          }
        } catch (err: any) {
          toast.error(`Error: ${err?.message || "No se pudo conectar"}`);
          if (oldProduct) {
            setProducts((prev) => prev.map((p) => p.id === id ? oldProduct : p));
          }
        }
      },
      deleteProduct: async (id) => {
        const oldProducts = products;
        
        // Eliminar de UI inmediatamente
        setProducts((prev) => prev.filter((p) => p.id !== id));
        
        try {
          const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);
          
          if (error) {
            toast.error(`Error: ${error.message || "Error al eliminar"}`);
            // Revertir cambio
            setProducts(oldProducts);
          } else {
            toast.success("Producto eliminado");
          }
        } catch (err: any) {
          toast.error(`Error: ${err?.message || "No se pudo conectar"}`);
          setProducts(oldProducts);
        }
      },
      loading,
    };
  }, [products, loading]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

// ✅ Hook personalizado para usar el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de ProductsProvider");
  }
  return context;
};