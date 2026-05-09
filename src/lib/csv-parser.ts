import { NewProduct } from "@/types/product";

export interface CSVRow {
  nro?: string;
  producto?: string;
  marca?: string;
  unidad?: string;
  url?: string;
  codigo?: string;
}

export interface ParsedProduct extends NewProduct {
  rowNumber: number;
}

export const parseCSVData = (csvText: string): ParsedProduct[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const products: ParsedProduct[] = [];

  // Saltar header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parsear CSV respetando comillas
    const values = parseCSVLine(line);
    
    if (values.length >= 6) {
      const product: ParsedProduct = {
        name: values[1]?.trim() || "",
        brand: values[2]?.trim() || "",
        capacity: values[3]?.trim() || "",
        image: values[4]?.trim() || "",
        code: values[5]?.trim() || "",
        rowNumber: i,
      };

      products.push(product);
    }
  }

  return products;
};

// Parsear línea CSV respetando comillas
const parseCSVLine = (line: string): string[] => {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
};

export const validateProducts = (products: ParsedProduct[]): { valid: ParsedProduct[]; errors: string[] } => {
  const errors: string[] = [];
  const valid: ParsedProduct[] = [];

  products.forEach((product) => {
    const rowErrors: string[] = [];

    if (!product.name) rowErrors.push("Producto vacío");
    if (!product.brand) rowErrors.push("Marca vacía");
    if (!product.capacity) rowErrors.push("Unidad vacía");
    if (!product.code) rowErrors.push("Código vacío");
    if (!product.image) rowErrors.push("URL vacía");
    else if (product.image && !product.image.startsWith("http")) rowErrors.push("URL inválida (debe comenzar con http)");

    if (rowErrors.length > 0) {
      errors.push(`Fila ${product.rowNumber}: ${rowErrors.join(", ")}`);
    } else {
      valid.push(product);
    }
  });

  return { valid, errors };
};
