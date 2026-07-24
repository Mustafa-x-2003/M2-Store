
export default function ProductBadge({
    category,
    price,
    discountPrice,
}) {
    const hasDiscount = Number(discountPrice) !== 0;

    return (
        <>
            <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-200/80 backdrop-blur-md text-slate-700 shadow-sm">
                {category}
            </span>

            {hasDiscount && (
                <span className="absolute top-4 right-16 inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-700 shadow-sm">
                    -
                    {Math.round(
                        ((price - discountPrice) / price) * 100
                    )}
                    %
                </span>
            )}
        </>
    );
}