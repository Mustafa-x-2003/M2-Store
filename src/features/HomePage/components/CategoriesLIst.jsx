import CategoryBlock from "./categoryBlock"

export default function CategoriesList({products}){
    const categories = [...new Set(products.map((product)=>product.category))]
    return (
        <section id="shopCategory" className="w-full bg-[#f8fafc] dark:bg-[#020617] py-14 px-4 sm:px-8 md:px-12 lg:px-20">

            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                    Shop by Category
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    Browse our wide range of categories
                </p>
            </div>

            <div className="mx-auto max-w-[1350px] px-4 sm:px-8 md:px-12 lg:px-20">
                <div className="flex flex-wrap gap-5">
                {categories.map((category) => (
                    <CategoryBlock
                        key={category}
                        category={category}
                        products={products}
                        
                    />
                ))}
                </div>
            </div>
            
        </section>
    )
}