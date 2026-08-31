import { currentCategories } from "@/lib/catalogue";

type Props = { activeCategory: string; onSelect: (category: string) => void };

export default function CategoryFilter({ activeCategory, onSelect }: Props) {
  return <div className="category-filter" aria-label="Product categories"><button onClick={() => onSelect("All")} className={activeCategory === "All" ? "active" : ""}>All</button>{currentCategories.map((item) => <button key={item.category} onClick={() => onSelect(item.category)} className={activeCategory === item.category ? "active" : ""}>{item.category}</button>)}</div>;
}
