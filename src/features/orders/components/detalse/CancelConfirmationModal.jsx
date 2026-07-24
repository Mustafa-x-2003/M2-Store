import React from 'react'

export default function CancelConfirmationModal({setShowCancelModal , handleConfirmCancel , cancelling }) {
  return (
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
  )
}
