import React from "react";

function CheckoutSummary({ cart }) {

    const tax = Math.round(cart.total * 0.14);
    const shipping = cart.subtotal > 1000 ? 0 : 50;

    const formatCurrency = (price) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EGP",
            maximumFractionDigits: 0,
        }).format(price);

    return (
        <aside
            className="xl:sticky xl:top-24 h-fit rounded-2xl border p-6 space-y-6"
            style={{
                background: "var(--card)",
                borderColor: "var(--border)",
            }}
        >
            <h2
                className="text-xl font-bold"
                style={{ color: "var(--text)" }}
            >
                Order Summary
            </h2>

            <div className="space-y-4">

                {cart?.items?.map((item) => (

                    <div
                        key={item._id}
                        className="flex justify-between items-center"
                    >

                        <div className="flex gap-3 items-center">

                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 rounded-lg object-cover bg-[var(--surface-secondary)]"
                            />

                            <div>

                                <h3
                                    className="font-medium"
                                    style={{ color: "var(--text)" }}
                                >
                                    {item.productId?.name}
                                </h3>

                                <p
                                    className="text-sm"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    x{item.quantity}
                                </p>

                            </div>

                        </div>

                        <h3
                            className="font-semibold"
                            style={{ color: "var(--text)" }}
                        >
                            {formatCurrency(item.price * item.quantity)}
                        </h3>

                    </div>

                ))}

            </div>

            <hr className="border-[var(--border)]" />

            <div className="space-y-3">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(cart.subtotal)}</span>
                </div>

                <div className="flex justify-between">

                    <div className="flex flex-col">

                        <span>Shipping</span>

                        {shipping !== 0 && (
                            <span
                                className="text-sm"
                                style={{ color: "var(--text-muted)" }}
                            >
                                Free shipping over EGP 1000
                            </span>
                        )}

                    </div>

                    {shipping === 0 ? (
                        <span className="text-[var(--success)]">
                            Free
                        </span>
                    ) : (
                        <span>
                            {formatCurrency(shipping)}
                        </span>
                    )}

                </div>

                <div className="flex justify-between">
                    <span>Tax (14%)</span>
                    <span>{formatCurrency(tax)}</span>
                </div>

                <hr className="border-[var(--border)]" />

                <div className="flex justify-between">

                    <h3 className="font-bold">
                        Total
                    </h3>

                    <h3 className="font-bold text-[var(--primary)]">
                        {formatCurrency(cart.total + shipping + tax)}
                    </h3>

                </div>

            </div>

            <button
                type="submit"
                className="w-full rounded-xl py-3 font-semibold transition-all duration-300 hover:bg-[var(--primary-hover)]"
                style={{
                    background: "var(--primary)",
                    color: "var(--text-inverse)",
                }}
            >
                Place Order
            </button>

        </aside>
    );
}

export default CheckoutSummary;