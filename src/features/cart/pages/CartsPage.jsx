import {React,useState,useEffect} from 'react'
import CartHeader from '../components/cart/CartHeader'
import CartItems from '../components/cart/CartItems'
import CouponSection from '../components/cart/CouponSection'
import { getCart } from '../services/cartApi'
import CartEmpty from '../components/cart/CartEmpty'
import { OrderSummary } from '../components/cart/OrderSummary'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router'
import { clearcart } from '../services/cartApi'
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function CartsPage() {
    const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCartItems = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const deletecart = async () => {
    try {
      if (!window.confirm("Are you sure you want to clear your cart?")) {
      return;
      }
      await clearcart();
      await getCartItems();
      toast.success("Cart cleared!");
        window.dispatchEvent(
        new Event("navbar-counts-update")
      );
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };
  return (
    <div className="my-10">
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-[var(--primary)]" />
        </div>
      ) : cart?.items?.length > 0 ? (
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

            <CartItems cart={cart} getCartItems={getCartItems} />

            <CouponSection
              getCartItems={getCartItems}
              cart={cart}
            />

            <button
              className="w-[150px] text-lg font-bold bg-[var(--danger)] p-2 rounded-2xl text-[var(--text-inverse)] hover:shadow-[var(--shadow)] transition-all duration-200"
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

          <div className="w-full xl:mt-20">
            <OrderSummary cart={cart} />
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  )
}
