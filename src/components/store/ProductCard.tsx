import { Package, Pencil, Trash2, MessageCircle } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

const WHATSAPP_NUMBER = "77793456";

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
    <article className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-spring hover:-translate-y-1 hover:border-[#db070b]/30 hover:shadow-[0_30px_110px_rgba(219,7,11,0.18)] animate-fade-up">
      <div className="relative aspect-square overflow-hidden bg-slate-950/90">
        {/* Fondo de favicon visible */}
        <div
          className="absolute inset-0 bg-[url('/favicon.svg')] bg-center bg-no-repeat bg-[length:100%] opacity-20"
          style={{ backgroundColor: "rgba(15,23,42,0.75)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(219,7,11,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(0,87,190,0.16),transparent_28%)]" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/60 to-transparent" />

        <div className="flex items-center h-full">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="relative z-0 max-h-[70%] w-full object-contain transition-spring duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative z-10 grid h-full w-full place-items-center text-slate-300">
              <Package className="h-14 w-14" />
            </div>
          )}
        </div>
        {
          product.code === "0" ? (<>
           </>) : (<> 
            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 shadow-sm">
             {product.code}
            </div> 
          </>)
        }
        
        <div className="absolute right-4 bottom-4 rounded-2xl bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
          {product.capacity}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-black leading-tight text-slate-950 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-slate-600">Marca <span className="font-semibold text-slate-900">{product.brand}</span></p>
        </div>

        <div className="mt-auto rounded-3xl border border-dashed border-slate-200/80 bg-slate-50/80 p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50">
          <p className="font-semibold text-slate-900">Todo listo para tu laboratorio</p>
          <p className="mt-1 text-xs text-slate-500">Consulta disponibilidad y envío inmediato por WhatsApp.</p>
        </div>

        <a
          href={getWhatsAppLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2"
        >
          <Button className="w-full gap-2 rounded-full bg-[#25D366] px-5 py-3 text-base font-semibold text-white shadow-[0_16px_40px_rgba(37,211,102,0.25)] hover:bg-[#1ebe59]">
            <MessageCircle className="h-5 w-5" />
            Obtener más información
          </Button>
        </a>
      </div>
    </article>
  );
};
