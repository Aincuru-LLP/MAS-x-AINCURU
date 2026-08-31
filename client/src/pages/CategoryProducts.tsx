import { useMemo, useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { Link, useRoute } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import ProductCard from "@/components/ProductCard";
import CatalogueDownloadCTA from "@/components/CatalogueDownloadCTA";
import { categoryDescription, categorySlug, currentCategories, getCurrentProductsByCategory } from "@/lib/catalogue";
import { MobileActionBar } from "@/components/MobileActionBar";
import { MotionReveal } from "@/components/Motion";

export default function CategoryProducts() {
  const [, params] = useRoute("/category/:slug");
  const category = currentCategories.find((item) => categorySlug(item.category) === (params?.slug ?? ""));
  const [query, setQuery] = useState("");
  const products = useMemo(() => {
    if (!category) return [];
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return getCurrentProductsByCategory(category.category).filter((product) => terms.every((term) => `${product.name} ${product.category}`.toLowerCase().includes(term)));
  }, [category, query]);

  if (!category) return <div className="min-h-screen bg-[#f8fafc]"><SiteHeader/><main className="grid min-h-[70vh] place-items-center pt-20"><div className="text-center"><p className="technical-label text-blue-700">CATEGORY NOT FOUND</p><h1 className="mt-3 text-4xl font-bold tracking-[-0.05em]">That category is not in the product index.</h1><Link href="/catalogue" className="mt-6 inline-flex text-sm font-bold text-blue-700">Back to Product Finder</Link></div></main></div>;
  return <div className="min-h-screen bg-[#f8fafc] text-slate-950"><SiteHeader/><main className="pt-24 sm:pt-28"><MotionReveal className="page-hero"><div className="section-rail">03 / CATEGORY</div><div><Link href="/catalogue" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-700"><ArrowLeft size={16}/> Back to Product Finder</Link><p className="technical-label mt-6 text-blue-700 sm:mt-8">CATEGORY RECORD / {String(category.count).padStart(2, "0")} PRODUCTS</p><h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.065em] sm:text-7xl">{category.category}</h1><p className="mt-6 max-w-xl text-base leading-7 text-slate-600">{categoryDescription(category.category)}</p></div></MotionReveal><section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-7 lg:px-10"><div className="relative"><Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-blue-700" size={20}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${category.category.toLowerCase()}…`} className="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-14 text-base font-medium shadow-[0_10px_36px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/>{query ? <button onClick={() => setQuery("")} aria-label="Clear category search" className="absolute right-4 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18}/></button> : null}</div><div className="mt-7 flex items-center justify-between border-b border-slate-200 pb-4"><p className="text-sm font-semibold text-slate-600"><span className="font-bold text-slate-950">{products.length}</span> of {category.count} listed products</p><p className="technical-label text-blue-700">PRODUCT RECORDS</p></div>{products.length ? <MotionReveal className="mt-9"><div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index}/>)}</div></MotionReveal> : <div className="mt-9 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center"><p className="text-xl font-bold tracking-[-0.03em]">No products found in this category.</p><button onClick={() => setQuery("")} className="mt-4 min-h-11 text-sm font-bold text-blue-700">Clear search</button></div>}</section><div className="mx-auto max-w-[1440px] px-5 pb-32 sm:px-7 lg:px-10"><CatalogueDownloadCTA/></div></main><MobileActionBar /></div>;
}
