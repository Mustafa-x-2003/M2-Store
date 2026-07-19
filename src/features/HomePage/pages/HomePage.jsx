import CategoriesList from "../components/CategoriesLIst";
import FirstSection from "../components/FirstSection";
import ProductList from "../components/productList";
import LastSection from "../components/lastSection";
import useProducts from "../hooks/useProducts";
import { useProduct } from "../../products/context/ProductContext";

export default function HomePage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="bg-[var(--background)]">
      <FirstSection />

      <CategoriesList products={products} />

      <ProductList
        products={products}
        loading={loading}
        error={error}
      />

      <LastSection />
    </div>
  );
}