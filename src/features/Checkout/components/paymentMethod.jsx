import React from "react";

function PaymentMethod({ register, errors, watch, }) {

    const paymentMethod = [
        {
            id: "cash",
            value: "cash",
            label: "Cash on Delivery",
            descriotion: "Pay when you receive your order"
        },
    ];

    const selectedPayment = watch("paymentMethod");

    const cardStyle = {
        background: "var(--card)",
    };

    return (
        <section className="space-y-5">
            <h2
                className="text-xl font-bold"
                style={{ color: "var(--text)" }}
            >
                Payment Method
            </h2>

            {paymentMethods.map((method) => (
                <label
                    key={method.id}
                    className="border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    style={{
                        ...cardStyle,
                        borderColor:
                            selectedPayment === method.value
                                ? "var(--primary)"
                                : "var(--border)",
                    }}
                >
                    <div className="flex items-start gap-4">

                        <input
                            id={method.id}
                            type="radio"
                            value={method.value}
                            {...register("paymentMethod", {
                                required: "Please select a payment method",
                            })}
                        />

                        <div>
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
                        </div>

                    </div>
                </label>
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