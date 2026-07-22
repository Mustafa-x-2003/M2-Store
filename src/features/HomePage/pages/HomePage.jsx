import CategoriesList from "../components/CategoriesLIst";
import FirstSection from "../components/FirstSection";
import ProductList from "../components/productList";
import LastSection from "../components/lastSection";
import useProducts from "../hooks/useProducts";
import { useProduct } from "../../productDeatails/context/ProductContext";
import Loading from "../../../components/common/Loading";

export default function HomePage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="pt-20 bg-[var(--surface)] transition-colors duration-300">
      <FirstSection />
      {loading ? (
        <div className="h-screen flex justify-center items-center">

          <Loading />
        </div>
      ) : (
        <>
          <CategoriesList products={products} />

          <ProductList products={products} loading={loading} error={error} />

          <LastSection />
        </>
      )}
    </div>
  );
}
