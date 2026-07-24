import ProductSlider from "./ProductSlider";
import ProductBadge from "./ProductBadge";
import WishlistButton from "./WishlistButton";

export default function ProductMedia({
    images,
    category,
    price,
    discountPrice,
    productId,
    stock,
    isInWishlist,
    onToggleWishlist,
}) {
    const hasDiscount = Number(discountPrice) !== 0;
    const outOfStock = Number(stock) === 0;

    return (
        <div className="relative overflow-hidden">

            <ProductSlider images={images} />

            <ProductBadge
                category={category}
                price={price}
                discountPrice={discountPrice}
            />

            <WishlistButton
                productId={productId}
                isInWishlist={isInWishlist}
                onToggleWishlist={onToggleWishlist}
            />

            {outOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                        Out of Stock
                    </span>
                </div>
            )}

        </div>
    );
}