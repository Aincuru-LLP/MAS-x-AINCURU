import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import ProductCard from "@/components/ProductCard";
import { categoryDescription, categorySlug, getRepresentativeProducts } from "@/lib/catalogue";
import { MotionReveal } from "@/components/Motion";

export default function CategoryProductSection({ category, index }: { category: string; index: number }) {
  const products = getRepresentativeProducts(category);
  return <MotionReveal><section id={`category-${categorySlug(category)}`} className="category-product-section"><div className="category-section-heading"><div><p className="technical-label text-blue-700">{String(index + 1).padStart(2, "0")} / CATEGORY INDEX</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-950 sm:text-4xl">{category}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{categoryDescription(category)}</p></div><Link href={`/category/${categorySlug(category)}`} className="link-arrow shrink-0">View all <ArrowRight size={16}/></Link></div><div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">{products.map((product, productIndex) => <ProductCard key={product.id} product={product} index={productIndex}/>)}</div></section></MotionReveal>;
}
