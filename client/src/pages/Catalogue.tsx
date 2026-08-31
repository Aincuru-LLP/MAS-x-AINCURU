import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import CategoryProductSection from "@/components/CategoryProductSection";
import CatalogueDownloadCTA from "@/components/CatalogueDownloadCTA";
import { currentCategories, currentProducts, findCurrentProducts } from "@/lib/catalogue";
import { MobileActionBar } from "@/components/MobileActionBar";
import { MotionReveal } from "@/components/Motion";

export default function Catalogue() {
  const initialParams = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(initialParams.get("q") ?? "");
  const [category, setCategory] = useState(initialParams.get("category") ?? "All");
  const isSearching = query.trim().length > 0;
  const results = useMemo(() => findCurrentProducts(query, category), [query, category]);
  const visibleCategories = category === "All" ? currentCategories : currentCategories.filter((item) => item.category === category);
  const selectCategory = (next: string) => { setCategory(next); setQuery(""); if (next !== "All") setTimeout(() => document.getElementById(`category-${next.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 40); };

  return <div className="min-h-screen bg-[#f8fafc] text-slate-950"><SiteHeader/><main className="pt-24 sm:pt-28"><MotionReveal className="page-hero"><div className="section-rail">02 / FINDER</div><div><p className="technical-label text-blue-700">PRODUCT FINDER / {currentProducts.length} CURRENT PRODUCTS</p><h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.065em] sm:text-7xl">Find what you need.</h1><p className="mt-6 max-w-xl text-base leading-7 text-slate-600">Search the current M.A.S. Traders product range by product name or category, then move into a focused category listing when you are ready to browse everything.</p></div></MotionReveal>
    <section className="mx-auto max-w-[1440px] px-5 pb-32 sm:px-7 lg:px-10"><div className="relative"><Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-blue-700" size={21}/><input id="catalogue-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, tools, fasteners…" className="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-16 text-base font-medium shadow-[0_10px_36px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>{query ? <button onClick={() => setQuery("")} aria-label="Clear product search" className="absolute right-4 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18}/></button> : null}</div><div className="mt-5"><CategoryFilter activeCategory={category} onSelect={selectCategory}/></div>
      {isSearching ? <MotionReveal className="mt-12"><section><div className="flex items-end justify-between border-b border-slate-200 pb-5"><div><p className="technical-label text-blue-700">SEARCH RESULTS</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.05em]">“{query}”</h2></div><p className="text-sm font-semibold text-slate-600"><span className="font-bold text-slate-950">{results.length}</span> result{results.length === 1 ? "" : "s"} found</p></div>{results.length ? <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">{results.map((product, index) => <ProductCard key={product.id} product={product} index={index}/>)}</div> : <div className="mt-9 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center"><p className="text-xl font-bold tracking-[-0.03em]">No products found.</p><p className="mt-2 text-sm text-slate-600">Try another product name or category.</p><button onClick={() => { setQuery(""); setCategory("All"); }} className="mt-5 min-h-11 text-sm font-bold text-blue-700 hover:text-blue-900">Clear search</button></div>}</section></MotionReveal> : <div className="mt-16 grid gap-16 sm:gap-20">{visibleCategories.map((item, index) => <CategoryProductSection key={item.category} category={item.category} index={index}/>)}</div>}
      <div className="mt-20"><CatalogueDownloadCTA/></div>
    </section></main><MobileActionBar /></div>;
}
