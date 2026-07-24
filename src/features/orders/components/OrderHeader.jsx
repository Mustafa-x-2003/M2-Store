import React from "react";
const OrderHeader = ({ title, desc }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-5 transition-colors duration-300">
        {title}
      </h2>
      <p className="text-[var(--text-secondary)] mb-2">{desc}</p>
    </div>
  );
};
export default OrderHeader;
