import React from "react";
import OrderCard from "./OrderCard";
const Orders = ({ orders }) => {
  return (
    <div className="w-full mx-auto flex flex-col gap-y-4">
      {orders?.map((order) => {
        return (
          <OrderCard
            key={order._id}
            id={order._id}
            status={order.status}
            date={order.createdAt}
            totalPrice={order.totalPrice}
            total={order.items.length}
          />
        );
      })}
    </div>
  );
};
export default Orders;
