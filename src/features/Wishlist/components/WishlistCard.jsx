import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";
const WishlistCard = ({ product, onAddToCart, onRemovefromWishlist })=>{
        console.log(product);
        const navigate =useNavigate()
      
        return(
                <>
                        <div className="w-full  bg-[var(--surface)] dark:bg-gray-800 dark:border-gray-700  shadow-[var(--shadow)] flex flex-col rounded-xl overflow-hidden border border-[var(--border)] justify-between ">
                                <div className="overflow-hidden cursor-pointer" onClick={() => { navigate(`/products/${product._id}`) }} >
                                        <img src={product.images?.[0]?.url} alt={product.name}  className=" w-full h-72 object-cover transition-all duration-500 hover:scale-105  "/>
                        </div>
                        <div className="flex flex-col gap-3 items-start p-4 justify-between  mb-3">
                                        <p onClick={() => { navigate(`/products/${product._id}`) }} className="line-clamp-2 cursor-pointer text-sm font-medium hover:text-[var(--primary)] text-[var(--text)]  "  >{product.name}</p>
                                <div className="flex items-center gap-4">
                                                <h4 className="font-bold text-xl text-[var(--primary)]"> EGP {product.price}</h4>
                                                <span className="text-[var(--text-muted)]"><del>EGP {product.discountPrice}</del></span>
                                </div>

                                        <div className="flex items-center gap-2 w-full">
                                                <button disabled={product.stock === 0} onClick={() => onAddToCart(product._id)} className={`cursor-pointer  bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-xs sm:text-sm  text-white whitespace-nowrap px-4 w-full py-2 rounded-lg flex flex-1 font-semibold items-center justify-center  gap-1 ${product.stock === 0 ? "bg-[var(--text-muted)] cursor-not-allowed" : "bg-[var(--primary)] hover:bg-[var(--primary-hover)]"}`} ><FaCartShopping />{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</button>
                                                
                                                <button onClick={() => onRemovefromWishlist(product._id)} className=" cursor-pointer bg-[var(--danger-light)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-[var(--text-inverse)]  px-2 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"><RiDeleteBin6Line /></button>
                                </div>
                               
                        </div>
                        
                </div>
                    
                </>

        )
}

export default WishlistCard