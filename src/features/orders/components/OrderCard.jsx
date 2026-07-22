import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";
const OrderCard = ({ id, status, date, totalPrice, total }) => {
  const x = useNavigate();
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const statusstyle =
    status === "shipped"
      ? "bg-[var(--teal-light)] text-[var(--teal)]"
      : status === "cancelled"
        ? "bg-[var(--danger-light)] text-[var(--danger)]"
        : status === "pending"
          ? "bg-[var(--warning-light)] text-[var(--warning)]"
          : status === "confirmed"
            ? "bg-[var(--info-light)] text-[var(--info)]"
            : "bg-[var(--purple-light)] text-[var(--purple)]";
  return (
    <div
      className="w-full bg-[var(--card)] border-1 border-[var(--border)] p-6 flex justify-between rounded-2xl hover:shadow-[var(--shadow)] transition-all  duration-300 cursor-pointer"
      onClick={() => x(`/orders/${id}`)}
    >
      <div className="flex flex-col min-w-0 gap-y-1">
        <div>
          <span className="text-xs font-bold text-[var(--text)] transition-colors duration-300">{`#${id.slice(-8).toUpperCase()}`}</span>
          <span
            className={`ml-2 px-2 py-1 rounded-xl text-xs font-bold ${statusstyle} capitalize`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] transition-colors duration-300">{formattedDate}</p>
        <h2 className="text-[var(--text-muted)] text-sm transition-colors duration-300">{`${total} item(s)`}</h2>
      </div>
      <div className="flex gap-3 items-center shrink-0">
        <h2 className="text-[var(--primary)] font-bold text-lg transition-colors duration-300">{`EGP ${totalPrice}`}</h2>
        <IoIosArrowForward className="text-lg text-[var(--text-muted)] transition-colors duration-300 relative top-[1px]" />
      </div>
    </div>
  );
};
export default OrderCard;
