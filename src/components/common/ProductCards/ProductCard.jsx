
import { useState } from "react";
import useProductCart from "../../../features/HomePage/hooks/useProductCart";
import { useWishlist } from "../../../features/Wishlist/context/WishlistContext";
import { useNavigate } from "react-router";
import ProductMedia from "./ProductMedia";
import ProductInfo from "./ProductInfo";
import AddToCartButton from "./AddToCartButton";
export default function ProductCard({
    product,
    onAddToCart,
    loading: externalLoading,
}) {
    const {
        loading: cartLoading,
        addProduct,
    } = useProductCart();
    const loading = externalLoading ?? cartLoading;
    const [clickAdd, setClickAdd] = useState(false);
    const navigate = useNavigate();
    const { wishlistProductIds, toggleWishlist } = useWishlist();
    const isInWishlist = wishlistProductIds.includes(product._id);
    const handleAdd = async (id) => {
        if (onAddToCart) {
            await onAddToCart(id);
            return;
        }

        const res = await addProduct({
            productId: id,
            quantity: 1,
        });

        if (res) setClickAdd(true);
    };
    return (
       
            <div
                className="bg-white w-full max-w-full dark:bg-gray-800 rounded-xl shadow-sm border border-gray-300 dark:border-gray-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/products/${product._id}`)}
            >
            <ProductMedia
                images={product.images}
                category={product.category}
                price={product.price}
                discountPrice={product.discountPrice}
                stock={product.stock}
                productId={product._id}
                isInWishlist={isInWishlist}
                onToggleWishlist={toggleWishlist}
            />
            <div className="px-4 py-3 flex flex-col gap-1.5 flex-1">
                <ProductInfo
                    name={product.name}
                    rating={product.rating}
                    reviews={product.numReviews}
                    price={product.price}
                    discountPrice={product.discountPrice}
                />

                <AddToCartButton
                    productId={product._id}
                    outOfStock={Number(product.stock) === 0}
                    loading={loading}
                    added={clickAdd}
                    onAdd={handleAdd}
                
                />
            </div>
            </div>
   
    )
}




