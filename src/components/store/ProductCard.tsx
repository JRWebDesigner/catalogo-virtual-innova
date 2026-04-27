import { Package, Pencil, Trash2 } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const stockStatus =
    product.stock === 0
      ? { label: "Agotado", className: "bg-destructive text-destructive-foreground" }
      : product.stock < 10
      ? { label: `Bajo · ${product.stock}`, className: "bg-primary text-primary-foreground" }
      : { label: `${product.stock} disp.`, className: "bg-accent text-accent-foreground" };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-card shadow-sm transition-spring hover:-translate-y-1 hover:border-accent/50 hover:shadow-elegant animate-fade-up">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-spring group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">
            <Package className="h-12 w-12" />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge className={`${stockStatus.className} rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md`}>
            {stockStatus.label}
          </Badge>
        </div>
        <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 translate-y-1 transition-spring group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={() => onEdit(product)}
            className="grid h-9 w-9 place-items-center rounded-full bg-background/95 text-primary shadow-md backdrop-blur transition-base hover:bg-accent hover:text-accent-foreground"
            aria-label="Editar"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="grid h-9 w-9 place-items-center rounded-full bg-background/95 text-destructive shadow-md backdrop-blur transition-base hover:bg-destructive hover:text-destructive-foreground"
            aria-label="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
            <span className="rounded-full bg-accent/30 px-2 py-0.5 text-primary">
              {product.brand}
            </span>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold leading-tight text-foreground line-clamp-2">
            {product.name}
          </h3>
        </div>

        <dl className="mt-auto space-y-1.5 text-sm">
          <div className="flex justify-between gap-2 border-t border-dashed border-border pt-2.5">
            <dt className="text-muted-foreground">Capacidad</dt>
            <dd className="font-semibold text-foreground text-right">{product.capacity}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Código</dt>
            <dd className="font-mono text-xs font-semibold text-primary">{product.code}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};
