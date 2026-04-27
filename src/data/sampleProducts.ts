import { Product } from "@/types/product";

const images = [
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
  "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80",
  "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
];

const brands = ["Botanika", "Verdelima", "EcoBio", "PuraTierra", "NaturaVida", "GreenLab"];
const baseNames = [
  "Aceite Esencial",
  "Crema Hidratante",
  "Shampoo Natural",
  "Sérum Vitamina",
  "Jabón Artesanal",
  "Tónico Facial",
  "Mascarilla",
  "Bálsamo Labial",
  "Exfoliante Corporal",
  "Loción Refrescante",
];
const variants = ["Lavanda", "Citrus", "Manzanilla", "Rosas", "Carbón", "Menta", "Eucalipto", "Coco", "Aloe", "Té Verde"];
const capacities = ["30ml x 6 piezas", "250ml x 1 pieza", "500ml x 3 piezas", "50ml x 2 piezas", "120g x 12 piezas", "200ml x 1 pieza", "75ml x 4 piezas"];

const generated: Product[] = [];
let counter = 1;
for (const brand of brands) {
  for (const base of baseNames) {
    for (const variant of variants.slice(0, 2)) {
      const id = String(counter++);
      generated.push({
        id,
        name: `${base} ${variant}`,
        capacity: capacities[counter % capacities.length],
        brand,
        code: `${brand.slice(0, 3).toUpperCase()}-${variant.slice(0, 3).toUpperCase()}-${String(counter).padStart(3, "0")}`,
        stock: (counter * 7) % 40,
        image: images[counter % images.length],
        createdAt: new Date(Date.now() - counter * 86400000).toISOString(),
      });
    }
  }
}

export const sampleProducts: Product[] = generated;
