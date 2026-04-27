export interface Product {
  id: string;
  name: string;
  capacity: string; // e.g. "250ml x7 piezas"
  brand: string;
  code: string;
  stock: number;
  image: string;
  createdAt: string;
}

export type NewProduct = Omit<Product, "id" | "createdAt">;
