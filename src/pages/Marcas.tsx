import { Link } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { StoreLayout } from "@/components/store/StoreLayout";
import { Button } from "@/components/ui/button";

const Marcas = () => {
  return (
    <StoreLayout>
      {() => (
        <section className="container py-10 md:py-14">
          <div className="mb-8">
            <h1 className=" text-4xl font-black text-foreground md:text-5xl">
              Marcas
            </h1>
            <p className="mt-1 text-muted-foreground">
              Página en construcción
            </p>
          </div>

          <div className="grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/30 py-24 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/30 text-primary">
              <Package className="h-7 w-7" />
            </div>
            <h3 className="mt-4  text-xl font-bold">
              Sección en construcción
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Por ahora, dirígete a Productos para ver todo nuestro catálogo.
            </p>
            <Link to="/productos" className="mt-6">
              <Button className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a Productos
              </Button>
            </Link>
          </div>
        </section>
      )}
    </StoreLayout>
  );
};

export default Marcas;
