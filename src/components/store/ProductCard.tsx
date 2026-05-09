import { Package, Pencil, Trash2, MessageCircle } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge";
//te amo rossy
interface ProductCardProps {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

const WHATSAPP_NUMBER = "76265987";

const generateWhatsAppMessage = (product: Product): string => {
  const message = `Hola, me interesa en el producto:\n\n📦 *${product.name}*\n📋 Código: ${product.code}\n📏 Capacidad: ${product.capacity}`;
  return encodeURIComponent(message);
};

const getWhatsAppLink = (product: Product): string => {
  const message = generateWhatsAppMessage(product);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <article className="group relative flex flex-col overflow-hidden border border-border bg-gradient-card shadow-sm transition-spring hover:-translate-y-1 hover:border-accent/50 hover:shadow-elegant animate-fade-up">
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
        {/* <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 translate-y-1 transition-spring group-hover:opacity-100 group-hover:translate-y-0">
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
        </div> */}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className=" text-lg font-bold leading-tight text-foreground line-clamp-2 text-center">
            {product.name}
          </h3>
        </div>

        <dl className="mt-auto space-y-1.5 text-sm">
          <div className="flex justify-center gap-2 border-t border-dashed border-border pt-2.5">
            <dd className="font-semibold text-foreground text-center">{product.capacity}</dd>
          </div>
          {/* <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Código</dt>
            <dd className="font-mono text-xs font-semibold text-primary">{product.code}</dd>
          </div> */}
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Marca</dt>
            <dd className="font-mono text-xs font-semibold text-primary">{product.brand}</dd>
          </div>
          {/* <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Unidad de Medida</dt>
            <dd className="font-mono text-xs font-semibold text-primary">{product.capacity}</dd>
          </div> */}
        </dl>

        <a 
          href={getWhatsAppLink(product)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4"
        >
          <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white text-lg">
            <MessageCircle className="h-4 w-4" />
            Obtener mas informacion
          </Button>
        </a>
      </div>
    </article>
  );
};
