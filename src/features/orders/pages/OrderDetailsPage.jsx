import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FiMapPin, FiCreditCard, FiPackage, FiXCircle } from "react-icons/fi";
import { getOrderById, cancelOrder } from "../services/orderService";
import OrderProgress from "../components/OrderProgress";
import Loading from "../../../components/common/Loading";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleConfirmCancel = async () => {
    try {
      setCancelling(true);
      const updatedOrder = await cancelOrder(id);
      setOrder(updatedOrder);
      setShowCancelModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center ">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[var(--danger)]">Error: {error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[var(--text-secondary)]">Order not found</p>
      </div>
    );
  }

  const {
    _id,
    items = [],
    shippingAddress = {},
    paymentMethod,
    paymentStatus,
    totalPrice,
    status,
    createdAt,
  } = order;

  const shortId = _id ? _id.slice(-8).toUpperCase() : "";

  const statusBadgeClass =
    status === "delivered"
      ? "bg-[var(--success-light)] text-[var(--success)]"
      : status === "cancelled"
        ? "bg-[var(--danger-light)] text-[var(--danger)]"
        : status === "shipped" || status === "processing"
          ? "bg-[var(--info-light)] text-[var(--info)]"
          : "bg-[var(--warning-light)] text-[var(--warning)]";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
            Order Details
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">Order #{shortId}</p>
        </div>

        <span
          className={`self-start sm:self-auto px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${statusBadgeClass}`}
        >
          {status}
        </span>
      </div>
      {/* Order Progress */}
      {status !== "cancelled" && <OrderProgress status={status} />}
      {/* Items */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiPackage className="text-[var(--primary)]" size={20} />
          <h2 className="text-lg font-bold text-[var(--text)]">Items</h2>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.product || index}
              className="flex items-center gap-4 pb-4 border-b border-[var(--border)] last:border-b-0 last:pb-0"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--surface-secondary)] flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-xs">
                    Item
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* <p className="font-semibold text-[var(--text)] truncate">
                  {item.name}          // if i want to display the name of product
                </p> */}
                <p className="text-sm text-[var(--text-secondary)]">
                  Qty: {item.quantity} × EGP {item.price}
                </p>
              </div>

              <div className="font-bold text-[var(--text)] whitespace-nowrap">
                EGP {item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Shipping Address & Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiMapPin className="text-[var(--primary)]" size={20} />
            <h2 className="text-lg font-bold text-[var(--text)]">
              Shipping Address
            </h2>
          </div>

          <div className="space-y-1 text-[var(--text-secondary)]">
            <p className="text-[var(--text)] font-medium">
              {shippingAddress.fullName}
            </p>
            <p>{shippingAddress.address}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.country}
            </p>
            <p>{shippingAddress.phone}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiCreditCard className="text-[var(--primary)]" size={20} />
            <h2 className="text-lg font-bold text-[var(--text)]">Payment</h2>
          </div>

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
      </div>

      {/* Cancel Order Button */}
      {(status === "pending" || status === "confirmed") && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowCancelModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-[var(--danger-light)] text-[var(--danger)] hover:opacity-90 transition"
          >
            <FiXCircle size={18} />
            Cancel Order
          </button>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-[var(--overlay)] flex items-center justify-center z-50 px-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-2xl font-bold text-[var(--text)] mb-2">
              Cancel Order?
            </h3>
            <p className="text-[var(--text-secondary)] mb-6 text-md">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={cancelling}
                className="flex-1 px-4 py-2 rounded-lg font-semibold bg-[var(--button-secondary)] text-[var(--text)] hover:bg-[var(--button-secondary-hover)] transition disabled:opacity-50"
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={cancelling}
                className="flex-1 px-4 py-2 rounded-lg font-semibold bg-[var(--danger)] text-[var(--text-inverse)] hover:opacity-90 transition disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
