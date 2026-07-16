import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineCube } from "react-icons/hi2";
import { FiShoppingBag } from "react-icons/fi";

function OrderSuccessPage() {

    const { id } = useParams();

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
        >
            <div
                className="w-full max-w-xl rounded-3xl border p-6 sm:p-8 text-center space-y-6 animate-[fadeIn_.5s_ease]"
                style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                }}
            >
                <div
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full"
                    style={{ background: "rgba(34,197,94,.12)" }}
                >
                    <FiCheckCircle
                        className="text-5xl"
                        style={{ color: "var(--success)" }}
                    />
                </div>
                <h1
                    className="text-3xl font-bold"
                    style={{ color: "var(--text)" }}
                >
                    Order Placed Successfully!
                </h1>
                <p
                    className="text-base"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Thank you for your purchase. Your order has been confirmed.
                </p>
                <p
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                >
                    Order ID:
                    <span
                        className="ml-2 font-semibold"
                        style={{ color: "var(--primary)" }}
                    >
                        #{id}
                    </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <Link
                        to={`/orders/${id}`}
                        className="flex items-center justify-center gap-2 rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
                        style={{
                            borderColor: "var(--border)",
                            color: "var(--text)",
                            background: "var(--card)"
                        }}
                    >
                        <FiPackage />
                        Track My Order
                    </Link>
                    <Link
                        to="/products"
                        className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
                        style={{
                            background: "var(--primary)",
                            color: "var(--text-inverse)"
                        }}
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccessPage;
