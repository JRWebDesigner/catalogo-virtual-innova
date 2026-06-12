import { Search } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/10 bg-white/85 shadow-sm backdrop-blur-xl dark:border-slate-800/40 dark:bg-slate-950/90">
      <div className="container grid gap-4 py-4 lg:grid-cols-[1.1fr_1fr_1fr] lg:items-center lg:py-5">
        <div className="flex items-center gap-4">
          <NavLink to="/" end className="text-lg font-black uppercase tracking-[0.2em] text-slate-950 dark:text-white">
            CATALOGO VIRTUAL
          </NavLink>
         
        </div>
         <nav className="items-center gap-2 lg:flex w-full justify-center items-center">
            <NavLink to="/" end className={navClass}>Inicio</NavLink>
            <NavLink to="/productos" className={navClass}>Productos</NavLink>
          </nav>
        <div className="relative mx-auto w-full max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar producto, marca o código…"
            className="h-12 rounded-full border border-slate-200 bg-white/90 pl-12 text-sm text-foreground shadow-sm transition focus-visible:border-[#0057be] focus-visible:ring-2 focus-visible:ring-[#0057be]/15 dark:border-slate-800 dark:bg-slate-900/80"
          />
        </div>
      </div>
    </header>
  );
};
