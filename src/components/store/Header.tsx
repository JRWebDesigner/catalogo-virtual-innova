import { Leaf, Plus, Search, Upload } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      {/* Desktop header */}
      <div className="hidden lg:block">
        <div className="container flex h-20 items-center gap-6">
          {/* Logo */}
          <NavLink to="/" end className="flex-shrink-0 text-xl font-bold text-primary">
            CATALOGO VIRTUAL
          </NavLink>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={navClass}>Inicio</NavLink>
            <NavLink to="/productos" className={navClass}>Productos</NavLink>
            {/* <NavLink to="/marcas" className={navClass}>Marcas</NavLink> */}
          </nav>

        {/* <div className="flex items-center gap-2 md:ml-2">
          {onImport && (
            <Button onClick={onImport} variant="outline" size="lg" className="gap-2">
              <Upload className="h-4 w-4" strokeWidth={3} />
              <span className="hidden sm:inline">Importar CSV</span>
              <span className="sm:hidden">CSV</span>
            </Button>
          )}
          <Button onClick={onAdd} variant="hero" size="lg" className="gap-2">
            <Plus className="h-4 w-4" strokeWidth={3} />
            <span className="hidden sm:inline">Nuevo producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Button> 
        </div>  */}
          {/* Search */}
          <div className="relative ml-auto flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search ?? ""}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar producto, marca o código…"
              className="h-11 rounded-full border-border/80 bg-secondary/60 pl-10 text-sm focus-visible:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet header */}
      <div className="lg:hidden">
        {/* Top bar with logo and search */}
        <div className="container flex h-16 items-center gap-3 py-2">
          {/* Logo */}
          <NavLink to="/" end className="flex-shrink-0 text-xs font-bold text-primary sm:text-sm">
            CATALOGO VIRTUAL
          </NavLink>

          {/* Search - visible on tablet and small screens */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search ?? ""}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar…"
              className="h-9 rounded-full border-border/80 bg-secondary/60 pl-9 text-xs placeholder:text-xs"
            />
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="container flex items-center gap-1 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <NavLink to="/" end className={navClass}>Inicio</NavLink>
          <NavLink to="/productos" className={navClass}>Productos</NavLink>
          {/* <NavLink to="/marcas" className={navClass}>Marcas</NavLink> */}
        </nav>
      </div>
    </header>
  );
};
