import {React,useState,useEffect} from "react";
import { getCart,updateQuantity,deleteitem } from "../../services/cartApi";
import CartItem from "./CartItem";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import CartHeader from "./CartHeader";
import { Navigate, useNavigate } from "react-router";
const CartItems=({cart,getCartItems})=>{
    const handleUpdateQuantity = async (productId, quantity) => {
  try {
   const response = await updateQuantity(productId, quantity);
    getCartItems();
  } catch (err) {
     toast.error(err.response.data.message);
  }
}
const deleteproduct = async (productId) => {
  try {
    const response=await deleteitem(productId);
    getCartItems();
    toast.success("Removed from cart")
  } catch (err) {
    console.log(err);
  }
}
    return (
        <>
        <div className="border-1 border-[var(--border)] p-4 w-[100%] h-fit bg-[var(--card)] rounded-2xl">
            {cart.items.map((item) => {
                return (
                    <CartItem
                        key={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        quantity={item.quantity}
                        productId={item.product}
                        handleUpdateQuantity={handleUpdateQuantity}
                        deleteproduct={deleteproduct}
                    />
                );
            })}
        </div>
        </>
);
}
export default CartItems