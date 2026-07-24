import React from "react";

export default function ShippingAddress({shippingAddress}) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <div className="space-y-2 text-[var(--text-secondary)]">
        <p className="text-[var(--text)] font-medium">
          <span className=" font-normal text-[var(--text-muted)] transition-colors duration-300">Name: </span> {shippingAddress.fullName}
        </p>
        <p> <span className=" font-normal text-[var(--text-muted)] transition-colors duration-300">Address: </span>  {shippingAddress.address}</p>
        <p>
          <span className=" font-normal text-[var(--text-muted)] transition-colors duration-300"> City: </span>  {shippingAddress.city}, {shippingAddress.country}
        </p>
        <p>
           <span className=" font-normal text-[var(--text-muted)] transition-colors duration-300">Country: </span>  {shippingAddress.country}
        </p>
        <p> <span className=" font-normal text-[var(--text-muted)] transition-colors duration-300">Phone: </span>  {shippingAddress.phone}</p>
      </div>
    </div>
  );
}
