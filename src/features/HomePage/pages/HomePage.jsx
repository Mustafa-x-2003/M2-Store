import CategoriesList from "../components/CategoriesLIst"
import FirstSection from "../components/FirstSection"
import ProductList from "../components/productList"
import LastSection from "../components/lastSection"
import useProducts from "../hooks/useProducts"

export default function HomePage() {
    const {products , getProducts , loading , error} = useProducts()
    
    const featuredProducts = products.filter(product => product.featured === true);
    return (
        <div>
            <FirstSection />
            <CategoriesList products={products}/>
            <ProductList products={featuredProducts} loading={loading} error={error} />
            <LastSection />
        </div>
    )
}