import React from "react";
import { Link } from "react-router";
export const OrderSummary = ({ cart }) => {
    const tax = Math.round(cart.total * 0.14)
    const shipping = cart.subtotal > 1000 ? 0 : 50;
    return (
        <div className="xl:sticky xl:top-24 xl:h-full border-1 border-[var(--border)] p-6 w-[100%] bg-[var(--card)] rounded-2xl">
            <h2 className="text-xl font-bold text-[var(--text)] mb-6">Order Summary</h2>
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-row justify-between">
                    <p>Subtotal</p>
                    <h2> {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "EGP",
                        maximumFractionDigits: 0,
                    }).format(cart.subtotal)}</h2>
                </div>
                {cart?.
                    discountAmount ? (
                    <div className="text-[var(--success)] flex justify-between">
                        <h2>Discount</h2>
                        <h2>{`-EGP ${cart.discountAmount
                            }`}</h2>
                    </div>
                ) : <></>}
                <div className="flex justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h2>Shipping</h2>

                        {cart?.subtotal <= 1000 && (
                            <p className="text-sm text-[var(--text-muted)]">
                                Free shipping on orders over EGP 1,000
                            </p>
                        )}
                    </div>

                    {cart?.subtotal > 1000 ? (
                        <h2 className="text-[var(--success)]">Free</h2>
                    ) : (
                        <h2>{`EGP ${shipping}`}</h2>
                    )}
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-3">
                    <h2>Tax (14%)</h2>
                    <h2>{`EGP ${tax}`}</h2>
                </div>
                <div className="flex justify-between">
                    <h2>Total</h2>
                    <h2 className="text-[var(--primary)] font-bold"> {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "EGP",
                        maximumFractionDigits: 1,
                    }).format(cart.total + tax + shipping)}</h2>
                </div>
            </div>
            <button className="w-full mx-auto text-center bg-[var(--primary)] text-[var(--text-inverse)] p-3 rounded-lg text-medium font-medium mt-3 hover:bg-[var(--primary-hover)] transition-all duration-200">Proceed to Checkout</button>
            <Link to="/products" className="text-[var(--primary)] flex justify-center mt-3">Continue Shopping</Link>
        </div>
    )
}