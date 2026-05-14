import { Leaf, Plus, Search, Upload } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onAdd: () => void;
  onImport?: () => void;
  search?: string;
  onSearch?: (v: string) => void;
}

export const Header = ({ onAdd, onImport, search, onSearch }: HeaderProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = (v: string) => {
    if (onSearch) {
      onSearch(v);
    } else if (v && pathname !== "/productos") {
      navigate(`/productos?q=${encodeURIComponent(v)}`);
    }
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition-base",
      isActive
        ? "bg-primary text-primary-foreground shadow-primary"
        : "text-foreground/70 hover:bg-secondary hover:text-foreground",
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-20 items-center gap-4">
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={"text-[1.5rem] font-bold text-primary"}>CATALOGO VIRTUAL</NavLink>
          <NavLink to="/" end className={navClass}>Inicio</NavLink>
          <NavLink to="/productos" className={navClass}>Productos</NavLink>
          <NavLink to="/marcas" className={navClass}>Marcas</NavLink>
        </nav>

        <div className="relative ml-auto hidden flex-1 max-w-sm md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar producto, marca o código…"
            className="h-11 rounded-full border-border/80 bg-secondary/60 pl-10 text-sm focus-visible:ring-accent"
          />
        </div>
      </div>

      <div className="container flex items-center gap-2 overflow-x-auto pb-3 lg:hidden">
        <NavLink to="/" end className={"text-[1.5rem] font-bold text-primary"}>CATALOGO VIRTUAL</NavLink>
        <NavLink to="/" end className={navClass}>Inicio</NavLink>
        <NavLink to="/productos" className={navClass}>Productos</NavLink>
        <NavLink to="/marcas" className={navClass}>Marcas</NavLink>
        <div className="relative ml-2 min-w-[200px] flex-1 md:hidden">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar…"
            className="h-10 rounded-full border-border/80 bg-secondary/60 pl-10 text-sm"
          />
        </div>
      </div>
    </header>
  );
};
