import { useRef, useState } from "react";
import { Upload, AlertCircle, CheckCircle2, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { parseCSVData, validateProducts, ParsedProduct } from "@/lib/csv-parser";
import { toast } from "sonner";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (products: ParsedProduct[]) => Promise<void>;
}

export const ImportDialog = ({ open, onOpenChange, onImport }: ImportDialogProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<ParsedProduct[]>([]);
  const [validProducts, setValidProducts] = useState<ParsedProduct[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);
  const [step, setStep] = useState<"idle" | "preview" | "importing" | "done">("idle");

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSVData(text);
      const { valid, errors: validationErrors } = validateProducts(parsed);

      setProducts(parsed);
      setValidProducts(valid);
      setErrors(validationErrors);

      if (validationErrors.length > 0) {
        console.error("Errores de validación:", validationErrors);
        toast.error(`${validationErrors.length} error${validationErrors.length !== 1 ? "es" : ""} en el CSV`);
        setStep("preview");
      } else if (valid.length === 0) {
        toast.error("El archivo CSV no contiene productos válidos");
        setStep("preview");
      } else {
        toast.success(`${valid.length} producto${valid.length !== 1 ? "s" : ""} listo${valid.length !== 1 ? "s" : ""} para importar`);
        setStep("preview");
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    setStep("importing");
    setImporting(true);

    try {
      await onImport(validProducts);
      setStep("done");
      setTimeout(() => {
        onOpenChange(false);
        setProducts([]);
        setValidProducts([]);
        setErrors([]);
        setStep("idle");
        if (fileRef.current) fileRef.current.value = "";
      }, 1500);
    } catch (err) {
      toast.error("Error al importar");
      setStep("preview");
    } finally {
      setImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importar productos desde CSV/Excel</DialogTitle>
          <DialogDescription>
            Estructura requerida: nombre producto, capacidad, marca, código, url imagen
          </DialogDescription>
        </DialogHeader>

        {step === "idle" && (
          <div className="space-y-4">
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file?.name.endsWith(".csv")) {
                  handleFileSelect(file);
                } else {
                  toast.error("Solo se aceptan archivos CSV");
                }
              }}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold">Arrastra tu archivo CSV aquí</p>
              <p className="text-sm text-muted-foreground">o haz click para seleccionar</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            />
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-4">
            {errors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <div className="flex gap-3 items-start mb-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-destructive mb-2">
                      ⚠️ Se encontraron {errors.length} error{errors.length !== 1 ? "es" : ""}:
                    </p>
                    <div className="text-xs text-destructive/80 space-y-1.5 max-h-40 overflow-y-auto">
                      {errors.map((error, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="flex-shrink-0">•</span>
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {validProducts.length > 0 && (
                  <p className="text-xs text-destructive/70 mt-2 border-t border-destructive/20 pt-2">
                    Se importarán {validProducts.length} producto{validProducts.length !== 1 ? "s" : ""} válido{validProducts.length !== 1 ? "s" : ""} de {products.length}
                  </p>
                )}
              </div>
            )}

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="font-semibold text-sm">
                ✅ {validProducts.length} producto{validProducts.length !== 1 ? "s" : ""} válido{validProducts.length !== 1 ? "s" : ""}
              </p>
              {products.length > validProducts.length && (
                <p className="text-xs text-muted-foreground mt-1">
                  ({products.length - validProducts.length} descartado{products.length - validProducts.length !== 1 ? "s" : ""} por errores)
                </p>
              )}
            </div>

            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-secondary">
                  <tr>
                    <th className="text-left p-2">Producto</th>
                    <th className="text-left p-2">Marca</th>
                    <th className="text-left p-2">Capacidad</th>
                    <th className="text-left p-2">Código</th>
                  </tr>
                </thead>
                <tbody>
                  {validProducts.map((p, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-2">{p.name}</td>
                      <td className="p-2">{p.brand}</td>
                      <td className="p-2">{p.capacity}</td>
                      <td className="p-2 font-mono text-xs">{p.code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {step === "importing" && (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Importando {validProducts.length} producto{validProducts.length !== 1 ? "s" : ""}...
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
            <p className="text-lg font-semibold">¡Importación completada!</p>
            <p className="text-sm text-muted-foreground text-center">
              {validProducts.length} producto{validProducts.length !== 1 ? "s" : ""} importado{validProducts.length !== 1 ? "s" : ""} correctamente
            </p>
          </div>
        )}

        <DialogFooter>
          {step === "preview" && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setProducts([]);
                  setValidProducts([]);
                  setErrors([]);
                  setStep("idle");
                  if (fileRef.current) fileRef.current.value = "";
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleImport}
                disabled={validProducts.length === 0 || importing}
              >
                Importar {validProducts.length} producto{validProducts.length !== 1 ? "s" : ""}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
