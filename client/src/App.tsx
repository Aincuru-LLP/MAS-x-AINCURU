import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";
import { RequirementProvider } from "./components/RequirementProvider";
import { ScrollProgress } from "./components/Motion";
import { ScrollToTop } from "./components/ScrollToTop";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/catalogue"} component={Catalogue} />
      <Route path={"/product/:slug"} component={ProductDetail} />
      <Route path={"/category/:slug"} component={CategoryProducts} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <RequirementProvider>
            <Toaster />
            <ScrollProgress />
            <ScrollToTop />
            <Router />
          </RequirementProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
