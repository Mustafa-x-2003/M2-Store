import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FiMapPin, FiCreditCard, FiXCircle, FiPackage } from "react-icons/fi";
import { getOrderById, cancelOrder } from "../services/orderService";
import OrderProgress from "../components/detalse/OrderProgress";
import Loading from "../../../components/common/Loading";
import OrderHeader from "../components/OrderHeader";
import ParentCard from "../components/detalse/ParentCard";
import Items from "../components/detalse/Items";
import ShippingAddress from "../components/detalse/ShippingAddress";
import Payment from "../components/detalse/Payment";
import CancelConfirmationModal from "../components/detalse/CancelConfirmationModal";

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
    <div className=" px-4 lg:px-0 md:w-[85%] lg:w-[78%] xl:w-[70%] pt-30 pb-10 min-h-[100vh] mx-auto ">
      {/* Title */}
      <div className="flex sm:flex-row sm:items-center sm:justify-between gap-3">
        <OrderHeader title={"Order Details"} desc={`Order #${shortId}`} />
        <span
          className={`self-start sm:self-auto px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${statusBadgeClass}`}
        >
          {status}
        </span>
      </div>
      {/* Order Progress */}
      <div className="mb-5">

      {status !== "cancelled" && <OrderProgress status={status} />}
      </div>

      {/* Items */}
      <ParentCard
        title={"Items"}
        icon={<FiPackage className="text-[var(--primary)]" size={20} />}
      >
        <Items items={items} />
      </ParentCard>

      {/* Shipping Address & Payment */}
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 gap-5">
        {/* Shipping Address */}
        <ParentCard
          title={"Shipping Address"}
          icon={<FiMapPin className="text-[var(--primary)]" size={20} />}
        >
          <ShippingAddress shippingAddress={shippingAddress} />
        </ParentCard>

        {/* Payment */}
        <ParentCard
          title={"Payment"}
          icon={<FiCreditCard className="text-[var(--primary)]" size={20} />}
        >
          <Payment
            paymentMethod={paymentMethod}
            formattedDate={formattedDate}
            totalPrice={totalPrice}
          />
        </ParentCard>
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
        <CancelConfirmationModal
          setShowCancelModal={setShowCancelModal}
          handleConfirmCancel={handleConfirmCancel}
          cancelling={cancelling}
        />
      )}
    </div>
  );
}
