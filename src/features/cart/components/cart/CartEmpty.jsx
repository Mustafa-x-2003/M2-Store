import React from "react";
import { useNavigate } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
const CartEmpty=()=>{
    const x=useNavigate()
    return(
        <div className="w-[50%] mx-auto flex flex-col items-center gap-y-4">
          <div className="w-19 h-19 bg-slate-100 flex items-center justify-center rounded-full">
            <FiShoppingCart className="w-9 h-9 text-[var(--text-muted)] font-bold" />
          </div>

          <h2 className="text-[var(--text)] text-xl font-bold">
            Your cart is empty
          </h2>

          <p className="text-[var(--text-secondary)] text-sm font-medium max-w-sm text-center">
           Looks like you haven't added anything to your cart yet. Start shopping and find something you love!
          </p>

          <button
            className="bg-[var(--primary)] text-[var(--button-secondary)] py-2 px-3 rounded-xl hover:bg-[var(--primary-hover)] transition-all duration-200"
            onClick={() => x("/products")}
          >
            Start Shopping
          </button>
        </div>
    )
}
export default CartEmpty;