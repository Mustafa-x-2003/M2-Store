import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const CartItem = ({ name, price, image, quantity, productId, handleUpdateQuantity, deleteproduct }) => {
    return (
        <div className="flex w-[100%] gap-4 py-4 border-b border-[var(--border)] last:border-b-0">
            <img src={image} alt={name} className="w-20 h-20 bg-[var(--surface-secondary)] rounded-2xl" />
            <div className="flex-1 min-w-0">
                <h2 className="mb-2 font-bold">{name}</h2>
                <h2 className="mb-2 text-[var(--primary)] font-bold">{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EGP",
                    maximumFractionDigits: 0,
                }).format(price)}</h2>
                <div className="flex gap-6">
                    <FaMinus className="p-2 border border-[var(--border)] rounded-xl text-3xl font-light hover:bg-[var(--surface-secondary)]" onClick={() => {
                        if (quantity > 1) {
                            handleUpdateQuantity(productId, quantity - 1);
                        }
                    }} />
                    <h2 className="text-center my-auto">{quantity}</h2>
                    <FaPlus className="p-2 border border-[var(--border)] rounded-xl text-3xl font-light hover:bg-[var(--surface-secondary)]" onClick={() => {
                        handleUpdateQuantity(productId, quantity + 1)
                    }} />
                </div>
            </div>
            <div className="flex flex-col justify-between items-end">
                <RiDeleteBin5Line className="text-[var(--text-muted)] hover:text-[var(--danger)]" onClick={() => {
                    deleteproduct(productId)
                }} />
                <h2 className="font-bold">{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EGP",
                    maximumFractionDigits: 0,
                }).format(price * quantity)}</h2>
            </div>
        </div>
    )
}
export default CartItem