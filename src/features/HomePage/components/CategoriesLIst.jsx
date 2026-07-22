import { Link } from "react-router";
import CategoryBlock from "./categoryBlock";

export default function CategoriesList({ products }) {
  const categories = [...new Set(products.map((product) => product.category))];
  return (
    <section
      id="shopCategory"
      className="w-full bg-[var(--surface)] py-10 px-4 sm:px-8 md:px-12 lg:px-20 transition-colors duration-300"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight transition-colors duration-300">
          Shop by Category
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 transition-colors duration-300">
          Browse our wide range of categories
        </p>
      </div>
    
      <div className="mx-auto max-w-[1350px] px-4 sm:px-8 md:px-12 lg:px-20 transition-colors duration-300">
        <div className="flex flex-wrap gap-5 transition-colors duration-300">
          {categories.map((category) => (
            <Link to={`/Shop?category=${category}`} key={category}>
              <CategoryBlock category={category} products={products} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
