import { Product } from "@/types/product";

// Datos de ejemplo con la nueva estructura
export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Aceite Esencial Lavanda",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    code: "AVL-001",
    capacity: "30ml",
    brand: "Botanika",
    createdAt: new Date().toISOString(),
  },
];
