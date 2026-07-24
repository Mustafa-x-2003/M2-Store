import React from 'react'

export default function Items({items}) {
  return (
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
  )
}
