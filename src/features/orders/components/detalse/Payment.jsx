import React from "react";

export default function Payment({paymentMethod , formattedDate , totalPrice}) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <p className="text-[var(--text-secondary)] capitalize ">
        {paymentMethod}
      </p>

      <div className="space-y-2 pt-4">
        <div className="flex justify-between font-bold text-[var(--text)] pt-2 border-t border-[var(--border)]">
          <span>Total</span>
          <span className="text-[var(--primary)]">EGP {totalPrice}</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] pt-1">
          Placed on {formattedDate}
        </p>
      </div>
    </div>
  );
}
