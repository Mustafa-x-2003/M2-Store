import React, { useEffect, useState } from "react";
import { getCart } from "../../cart/services/cartApi";
import { useForm } from "react-hook-form";
import { createOrder } from "../services/checkoutApi";
import { showSuccessToast } from "../components/toastConfig";
import { useNavigate } from "react-router";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineMapPin } from "react-icons/hi2";
import toast from "react-hot-toast";
import ShippingAddressForm from "../components/shippingAddressForm";
import PaymentMethod from "../components/paymentMethod";
import OrderNotes from "../components/orderNotes";
import CheckoutSummary from "../components/checkoutSummary";
import Loading from "../../../components/common/Loading";

function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCartItems = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentMethod: "cash",
      orderNotes: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);

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
      const response = await createOrder(orderData);

      showSuccessToast("Order placed successfully!");

      navigate(`/success/${response.data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!cart) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[90%] pt-20 xl:w-[85%] mx-auto my-10">
        <div className="flex items-center gap-3 mb-8">
          <HiOutlineShoppingBag
            className="text-4xl"
            style={{ color: "var(--primary)" }}
          />
          <h1 className="text-4xl font-bold" style={{ color: "var(--text)" }}>
            Checkout
          </h1>
        </div>
        <div className="flex mb-8 items-center gap-3">
          <HiOutlineMapPin
            className="text-3xl"
            style={{ color: "var(--primary)" }}
          />
          <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            Shipping Address
          </h2>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[2.7fr_1.3fr] gap-8">
          <div className="space-y-8">
            <ShippingAddressForm register={register} errors={errors} />
            <PaymentMethod
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <OrderNotes register={register} />
          </div>
          <div className="">
            <CheckoutSummary cart={cart} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CheckoutPage;
