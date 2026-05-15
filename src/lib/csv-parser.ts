import { NewProduct } from "@/types/product";

export interface ParsedProduct extends NewProduct {
  rowNumber: number;
}

export const parseCSVData = (csvText: string): ParsedProduct[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const products: ParsedProduct[] = [];

  if (lines.length === 0) return products;

  // Detectar header y saltar
  let startIndex = 0;
  const firstLine = parseCSVLine(lines[0]);
  
  // Si la primera línea parece ser un header (contiene palabras clave)
  const headerKeywords = ['nombre', 'producto', 'nombre producto', 'capacidad', 'marca', 'codigo', 'code', 'url', 'imagen', 'image'];
  const isHeader = firstLine.some(cell => 
    headerKeywords.some(keyword => cell.toLowerCase().includes(keyword))
  );
  
  if (isHeader) {
    startIndex = 1;
  }

  // Parsear productos
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    
    // Esperar al menos 5 columnas: nombre, capacidad, marca, codigo, url
    if (values.length >= 5) {
      const product: ParsedProduct = {
        name: values[0]?.trim() || "",
        capacity: values[1]?.trim() || "",
        brand: values[2]?.trim() || "",
        code: values[3]?.trim() || "",
        image: values[4]?.trim() || "",
        rowNumber: i + 1,
      };

      products.push(product);
    }
  }

  return products;
};

// Parsear línea CSV respetando comillas
export const parseCSVLine = (line: string): string[] => {
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

    if (!product.name?.trim()) rowErrors.push("Nombre del producto vacío");
    if (!product.capacity?.trim()) rowErrors.push("Capacidad vacía");
    if (!product.brand?.trim()) rowErrors.push("Marca vacía");
    if (!product.code?.trim()) rowErrors.push("Código vacío");
    if (!product.image?.trim()) {
      rowErrors.push("URL de imagen vacía");
    } else if (product.image && !product.image.startsWith("http")) {
      rowErrors.push("URL inválida (debe comenzar con http)");
    }

    if (rowErrors.length > 0) {
      errors.push(`Fila ${product.rowNumber}: ${rowErrors.join(", ")}`);
    } else {
      valid.push(product);
    }
  });

  return { valid, errors };
};
