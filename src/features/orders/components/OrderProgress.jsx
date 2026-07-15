import React from "react";
import {
  FiClock,
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiHome,
} from "react-icons/fi";

const STEPS = [
  { key: "pending", label: "Pending", icon: FiClock },
  { key: "confirmed", label: "Confirmed", icon: FiCheckCircle },
  { key: "processing", label: "Processing", icon: FiPackage },
  { key: "shipped", label: "Shipped", icon: FiTruck },
  { key: "delivered", label: "Delivered", icon: FiHome },
];

/**
 * Reusable order progress tracker.
 * Highlights all steps up to and including the current status.
 * Handles "cancelled" / "returned" as special (non-linear) statuses.
 */
export default function OrderProgress({ status }) {
  const currentIndex = STEPS.findIndex((step) => step.key === status);

  const isCancelledOrReturned = status === "cancelled" || status === "returned";

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <h2 className="text-lg font-bold text-[var(--text)] mb-6">
        Order Progress
      </h2>

      {isCancelledOrReturned ? (
        <div className="text-center py-4">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              status === "cancelled"
                ? "bg-[var(--danger-light)] text-[var(--danger)]"
                : "bg-[var(--warning-light)] text-[var(--warning)]"
            }`}
          >
            {status === "cancelled" ? "Order Cancelled" : "Order Returned"}
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentIndex;
            const isLast = index === STEPS.length - 1;

            return (
              <div
                key={step.key}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isActive
                        ? "bg-[var(--primary)] border-[var(--primary)] text-[var(--text-inverse)]"
                        : "bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--text-muted)]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium whitespace-nowrap ${
                      isActive
                        ? "text-[var(--primary)]"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-5 transition-colors ${
                      index < currentIndex
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--border)]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
