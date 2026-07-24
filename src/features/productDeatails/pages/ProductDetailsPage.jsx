import { ProductProvider } from "../context/ProductContext";
import ProductInfo from "../components/ProductInfo";
import ProductTabs from "../components/ProductTaps";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetailsPage() {
  return (
    <ProductProvider>
      <main className="min-h-screen bg-[var(--background)] transition-colors duration-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">

          {/* Top Section */}
          <ProductInfo />

          {/* Details & Reviews Tabs */}
          <ProductTabs />

          {/* Related Products */}
          <RelatedProducts />

        </div>
      </main>
    </ProductProvider>
  );
}
