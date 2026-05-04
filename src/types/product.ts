export interface Product {
  id: string;
  name: string;
  image: string; // Enlace de Google Drive
  code: string; // Código del producto
  capacity: string; // e.g. "250ml", "x 7 piezas"
  brand: string; // Marca del producto
  createdAt: string;
}

export type NewProduct = Omit<Product, "id" | "createdAt">;
