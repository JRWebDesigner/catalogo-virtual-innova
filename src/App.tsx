import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductsProvider } from "@/context/ProductsContext";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import Productos from "./pages/Productos.tsx";
import Marcas from "./pages/Marcas.tsx";
import MarcaDetalle from "./pages/MarcaDetalle.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
// te amo rossy
const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProductsProvider>
        <div className="relative min-h-screen">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/marcas" element={<Marcas />} />
              <Route path="/marca/:brand" element={<MarcaDetalle />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

          <a
            href="https://api.whatsapp.com/send?phone=59177793456&text=Hola!%20Quisiera%20más%20información%20sobre%20el%20catálogo"
            target="_blank"
            rel="noreferrer"
            className="fixed right-5 bottom-5 z-50 rounded-full border border-white/15 bg-[#25D366] px-5 py-4 text-white shadow-[0_18px_40px_rgba(37,211,102,0.28)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(37,211,102,0.34)]"
          >
            <div className="flex items-center gap-3 text-base font-semibold">
              <MessageCircle className="h-6 w-6" />
              No dudes en preguntar
            </div>
          </a>
        </div>
      </ProductsProvider>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
