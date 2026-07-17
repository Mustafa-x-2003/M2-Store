import React, { useEffect, useState } from "react";
import { HiOutlineCreditCard } from "react-icons/hi2";

function PaymentMethod({ register, errors, watch, setValue, }) {

    const paymentMethods = [
        {
            id: "cash",
            value: "cash",
            label: "Cash on Delivery",
            description: "Pay when you receive your order"
        },
    ];

    const selectedPayment = watch("paymentMethod");
    const [hoveredMethod, setHoveredMethod] = useState(null);

    useEffect(() => {
        register("paymentMethod", {
            required: "Please select a payment method",
        });
    }, [register]);

    return (
        <section
            className="rounded-2xl border p-6 space-y-6"
            style={{
                background: "var(--card)",
                borderColor: "var(--border)",
            }}
        >
            <div className="flex items-center gap-3">
                <HiOutlineCreditCard
                    className="text-2xl"
                    style={{ color: "var(--primary)" }}
                />
                <h2
                    className="text-xl font-bold"
                    style={{ color: "var(--text)" }}
                >
                    Payment Method
                </h2>
            </div>
            {paymentMethods.map((method) => (
                <div
                    key={method.id}
                    onClick={() =>
                        setValue("paymentMethod", method.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                    onMouseEnter={() => setHoveredMethod(method.id)}
                    onMouseLeave={() => setHoveredMethod(null)}
                    className="rounded-2xl border p-6 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                    style={{
                        background:
                            selectedPayment === method.value
                                ? "var(--primary-soft)"
                                : hoveredMethod === method.id
                                    ? "var(--primary-soft-hover)"
                                    : "var(--card)",

                        borderColor:
                            selectedPayment === method.value
                                ? "var(--primary)"
                                : hoveredMethod === method.id
                                    ? "var(--primary)"
                                    : "var(--border)",
                        boxShadow:
                            selectedPayment === method.value
                                ? "0 8px 24px rgba(59,130,246,.12)"
                                : "none",
                    }}
                >
                    <div className="flex items-center">

                        <HiOutlineCreditCard
                            className="text-2xl"
                            style={{ color: "var(--primary)" }}
                        />
                        <div className="ml-4 flex-1">
                            <h3
                                className="font-semibold"
                                style={{ color: "var(--text)" }}
                            >
                                {method.label}
                            </h3>
                            <p
                                className="text-sm mt-1"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {method.description}
                            </p>

                        </div></div>
                </div>
            ))}

            {errors.paymentMethod && (
                <p
                    className="text-sm mt-2"
                    style={{ color: "var(--danger)" }}
                >
                    {errors.paymentMethod.message}
                </p>
            )}
        </section>
    );

}

export default PaymentMethod;