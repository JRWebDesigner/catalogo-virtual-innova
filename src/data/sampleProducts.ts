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
  {
    id: "2",
    name: "Crema Hidratante Rosas",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    code: "CHR-002",
    capacity: "250ml",
    brand: "CATALOGO VIRTUAL",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Shampoo Natural Menta",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80",
    code: "SNM-003",
    capacity: "500ml",
    brand: "EcoBio",
    createdAt: new Date().toISOString(),
  },
];
