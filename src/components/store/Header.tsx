import { Leaf, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onAdd: () => void;
  search: string;
  onSearch: (v: string) => void;
}

export const Header = ({ onAdd, search, onSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-20 items-center gap-4">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-primary transition-spring group-hover:scale-105">
            <Leaf className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-accent ring-2 ring-background" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl font-black text-primary">Verdelima</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Catálogo Pro
            </span>
          </div>
        </a>

        <div className="relative ml-6 hidden flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar por nombre, marca o código…"
            className="h-11 rounded-full border-border/80 bg-secondary/60 pl-10 text-sm focus-visible:ring-accent"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button onClick={onAdd} variant="hero" size="lg" className="gap-2">
            <Plus className="h-4 w-4" strokeWidth={3} />
            <span className="hidden sm:inline">Nuevo producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        </div>
      </div>

      <div className="container pb-3 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar producto…"
            className="h-11 rounded-full border-border/80 bg-secondary/60 pl-10 text-sm"
          />
        </div>
      </div>
    </header>
  );
};
