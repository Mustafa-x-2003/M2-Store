import { React, useState, useEffect } from "react";
import CartHeader from "../components/cart/CartHeader";
import CartItems from "../components/cart/CartItems";
import CouponSection from "../components/cart/CouponSection";
import { getCart } from "../services/cartApi";
import CartEmpty from "../components/cart/CartEmpty";
import { OrderSummary } from "../components/cart/OrderSummary";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router";
import { clearCart } from "../services/cartApi";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
export default function CartsPage() {
  const { cart, fetchCart } = useCart();
  const getCartItems = async () => {
    try {
      const res = await getCart();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const deletecart = async () => {
    try {
      const res = await clearCart();
      await fetchCart();
      toast.success("cart cleared!");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };
  return (
    <div className="min-h-[100vh] py-25 flex justify-center items-center">
      {cart?.items?.length > 0 ? (
        <div
          className="xl:w-[85%] mx-auto w-[90%]
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[2.75fr_1.25fr]
                xl:grid-rows-1
                xl:gap-10"
        >
          <div className="flex flex-col gap-y-4 w-full">
            <CartHeader />
            <CartItems cart={cart} />
            <CouponSection getCartItems={getCartItems} cart={cart} />
            <button
              className="w-[150px] text-lg font-bold bg-[var(--primary)] p-2 rounded-2xl text-[var(--text-inverse)] hover:bg-[var(--primary-hover)] transition-all duration-200"
              onClick={deletecart}
            >
              Clear Cart
            </button>
            <Link
              to="/products"
              className="text-[var(--primary)] w-[160px] flex justify-between items-center"
            >
              <IoIosArrowRoundBack className="text-lg text-[var(--primary)]" />
              Continue Shopping
            </Link>
          </div>
          <div className="w-full h-fit xl:mt-20">
            <OrderSummary cart={cart} />
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}
