import React, { useEffect, useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { updateCoupon } from "../../services/cartApi";
import toast from "react-hot-toast";
import { removeCoupon } from "../../services/cartApi";
const CouponSection=({getCartItems,cart})=>{
    const[coupon,setCoupon]=useState("")
    const[loading,setLoading]=useState(false)
    const applycode=async () => {
      try {
        const code = coupon.trim().toUpperCase();
        setLoading(true);
        if(code==='SAVE10'||code==='SAVE20'){
        const res = await updateCoupon(coupon);
       toast.success(res.data.message);
        getCartItems();
        }
        else{
            toast.error("Invalid coupon code");
            setCoupon("")
        }
      } catch (err) {
         toast.error(err.res?.data?.message || "Validation Error");
      }finally{
        setLoading(false)
      }
    }
    const handleRemoveCoupon = async () => {
  try {
    const res = await removeCoupon();
    setCoupon("")
    toast.success("Coupon Removed")
    getCartItems()
  } catch (err) {
    console.log(err);
  }
};
    return(
        <div className="border-1 border-[var(--border)] rounded-2xl p-6 bg-[var(--card)]">
            <h3 className="flex gap-x-1 justify-center items-start text-medium font-semibold w-fit font-bold">
            <CiDiscount1 className="text-xl mt-0.75" />
            Coupon Code
            </h3>
           {!(cart?.discountAmount)? (
  <div className="flex gap-x-2 mt-2">
    <input
      type="text"
      placeholder="Enter coupon code"
      value={coupon}
      onChange={(e) => setCoupon(e.target.value)}
     onKeyDown={(e) => {
  if (e.key === "Enter") {
    applycode();
  }
}}
      className="flex-1 px-6 py-2 border border-[var(--border)] rounded-xl"
    />

   <button
  onClick={applycode}
  disabled={loading}
  className="text-[var(--primary)]
             hover:bg-blue-600/10
             transition-all
             duration-200
             rounded-xl
             px-4
             border
             border-[var(--primary)]
             disabled:opacity-60
             disabled:cursor-not-allowed"
>
  {loading ? (
  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
) : (
  "Apply"
)}
</button>
  </div>
) : (
  <div className="flex justify-between items-center mt-2 p-3 rounded-xl bg-green-50">
    <span className="text-[var(--success)] text-sm font-bold">
      Coupon "{cart.coupon}" applied
    </span>

    <button
      onClick={handleRemoveCoupon}
      className="text-[var(--danger)] text-sm"
    >
      ✕
    </button>
  </div>
)}
        </div>
    )
}
export default CouponSection