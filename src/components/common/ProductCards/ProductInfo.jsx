import ProductRating from "./ProductRating";

export default function ProductInfo({
    name,
    rating,
    reviews,
    price,
    discountPrice,
}) {
    const hasDiscount = Number(discountPrice) > 0;

    return (
        <div className="space-y-2">
            <div className="flex flex-col items-start ">
                <h3 className="font-semibold min-h-11 text-gray-800 dark:text-gray-100 text-md leading-snug line-clamp-2">
                    {name}
                </h3>

                <ProductRating
                    rating={rating}
                    reviews={reviews}
                />
            </div>

            <div>
                {hasDiscount ? (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xl font-bold text-blue-800 dark:text-gray-100">
                            EGP {discountPrice}
                        </span>

                        <span className="text-sm font-medium text-gray-400 line-through">
                            EGP {price}
                        </span>
                    </div>
                ) : (
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        EGP {price}
                    </span>
                )}
            </div>
        </div>
    );
}