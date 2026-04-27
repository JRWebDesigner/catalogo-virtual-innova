import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product, NewProduct } from "@/types/product";
import { toast } from "sonner";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Product | null;
  onSave: (data: NewProduct, id?: string) => void;
}

const empty: NewProduct = {
  name: "",
  capacity: "",
  brand: "",
  code: "",
  stock: 0,
  image: "",
};

export const ProductForm = ({ open, onOpenChange, initial, onSave }: ProductFormProps) => {
  const [form, setForm] = useState<NewProduct>(empty);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : empty);
    }
  }, [open, initial]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Selecciona un archivo de imagen válido");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen debe pesar menos de 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.brand.trim() || !form.code.trim() || !form.capacity.trim()) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }
    if (!form.image) {
      toast.error("Carga una imagen del producto");
      return;
    }
    onSave(form, initial?.id);
    onOpenChange(false);
    toast.success(initial ? "Producto actualizado" : "Producto agregado al catálogo");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        <div className="bg-gradient-primary p-6 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-black">
              {initial ? "Editar producto" : "Nuevo producto"}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              Completa los datos. La imagen es obligatoria.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={submit} className="grid gap-5 p-6 md:grid-cols-[200px_1fr]">
          {/* Image */}
          <div className="md:col-span-2 md:grid md:grid-cols-[200px_1fr] md:gap-5">
            <div>
              <Label className="mb-2 block text-xs font-bold uppercase tracking-wider">
                Imagen *
              </Label>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleFile(f);
                }}
                className="group relative grid aspect-square cursor-pointer place-items-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-secondary/40 transition-base hover:border-accent hover:bg-accent/10"
              >
                {form.image ? (
                  <>
                    <img
                      src={form.image}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((f) => ({ ...f, image: "" }));
                      }}
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-md transition-base hover:scale-110"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-4 text-center text-muted-foreground">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/20 text-primary transition-spring group-hover:scale-110">
                      <Upload className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold">Subir imagen</p>
                    <p className="text-[10px] text-muted-foreground/70">
                      Click o arrastra · máx. 5MB
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>

            {/* Fields */}
            <div className="mt-5 space-y-4 md:mt-0">
              <Field label="Nombre del producto *">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Aceite Esencial de Lavanda"
                  required
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Marca *">
                  <Input
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    placeholder="Botanika"
                    required
                  />
                </Field>
                <Field label="Código *">
                  <Input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="BTK-001"
                    className="font-mono"
                    required
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Capacidad *">
                  <Input
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                    placeholder="250ml x 7 piezas"
                    required
                  />
                </Field>
                <Field label="Stock *">
                  <Input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: Math.max(0, parseInt(e.target.value) || 0) })
                    }
                    required
                  />
                </Field>
              </div>
            </div>
          </div>

          <DialogFooter className="md:col-span-2 mt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="hero" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              {initial ? "Guardar cambios" : "Agregar producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {label}
    </Label>
    {children}
  </div>
);
