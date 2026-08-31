import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "wouter";
import { useRequirement } from "@/components/RequirementProvider";
import { productImage, type Product } from "@/lib/catalogue";

export default function ProductCard({ product, index }: { product: Product; index?: number }) {
  const { add } = useRequirement();
  return <article className="product-card group">
    <Link href={`/product/${product.slug}`} className="product-media"><img src={productImage(product)} alt={product.name} width={1200} height={1200} loading="lazy" decoding="async" className="h-full w-full object-contain p-2.5 transition duration-500 group-hover:scale-[1.04] sm:p-3" /><span className="media-corner" />{index !== undefined ? <span className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 font-mono text-[10px] font-bold text-blue-700">{String(index + 1).padStart(3, "0")}</span> : null}</Link>
    <div className="flex items-start justify-between gap-3 pt-4">
      <div className="min-w-0"><p className="technical-label truncate text-blue-700">{product.category}</p><h3 className="mt-1 text-[0.95rem] font-bold leading-5 tracking-[-0.03em] text-slate-950 sm:text-lg">{product.name}</h3></div>
      <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="mt-1 grid min-h-11 min-w-11 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"><ArrowUpRight size={16}/></Link>
    </div>
    <button onClick={() => add(product)} className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-bold text-blue-700 transition hover:text-blue-900 sm:mt-4 sm:text-sm"><Plus size={16}/> Add to Requirement</button>
  </article>;
}
