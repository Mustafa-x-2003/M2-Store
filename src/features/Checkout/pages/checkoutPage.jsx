import React, { useEffect, useState } from "react";
import { getCart } from "../../cart/services/cartApi";
import { useForm } from "react-hook-form";
import { createOrder } from "../services/checkoutApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ShippingAddressForm from "../components/shippingAddressForm";
import PaymentMethod from "../components/paymentMethod";
import OrderNotes from "../components/orderNotes";
import CheckoutSummary from "../components/checkoutSummary";

function CheckoutPage() {

    const [cart, setCart] = useState(null);

    const getCartItems = async () => {
        try {
            const res = await getCart();
            setCart(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCartItems();
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            paymentMethod: "cash",
            orderNotes: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const orderData = {
            shippingAddress: {
                fullName: data.fullName,
                phone: data.phone,
                country: data.country,
                city: data.city,
                address: data.address,
                postalCode: "",
            },
            paymentMethod: data.paymentMethod,
            customerNote: data.orderNotes,
        };
        try {
            await createOrder(orderData);
            toast.success("Order placed successfully!", {
                duration: 3500,

                style: {
                    borderRadius: "12px",
                    background: "#111827",
                    color: "#fff",
                    padding: "14px 18px",
                },

                iconTheme: {
                    primary: "#22c55e",
                    secondary: "#fff",
                },
            });
            navigate("/success");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    if (!cart) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p
                    className="text-lg"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[90%] xl:w-[85%] mx-auto my-10 grid grid-cols-1 xl:grid-cols-[2.7fr_1.3fr] gap-8"
            >
                <div className="space-y-8">
                    <ShippingAddressForm
                        register={register}
                        errors={errors}
                    />
                    <PaymentMethod
                        register={register}
                        errors={errors}
                        watch={watch}
                    />
                    <OrderNotes
                        register={register}
                    />
                </div>
                <div>
                    <CheckoutSummary
                        cart={cart}
                    />
                </div>

            </div>

        </form>

    );
}

export default CheckoutPage;
