import CategoryBlock from "./categoryBlock"

export default function CategoriesList({products}){
    const categories = [...new Set(products.map((product)=>product.category))]
    return (
        <section id="shopCategory" className="w-[90%] mx-auto bg-[var(--background)] py-14 px-6 sm:px-8 md:px-10">

            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                    Shop by Category
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
                    Browse our wide range of categories
                </p>
            </div>

            <div className="flex flex-wrap gap-5 w-full mx-auto">
                {categories.map((category) => (
                    <CategoryBlock
                        key={category}
                        category={category}
                        products={products}
                    />
                ))}
            </div>
        </section>
    )
}