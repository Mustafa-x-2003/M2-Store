import React from "react";

function OrderNotes({ register }) {
    return (
        <section className="space-y-5">
            <h2
                className="text-xl font-bold"
                style={{ color: "var(--text)" }}
            >
                Order Notes (Optional)
            </h2>
            <textarea
                rows={4}
                placeholder="Any special instructions for your order..."
                {...register("orderNotes")}
                className="w-full rounded-2xl border p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] transition-all duration-300 placeholder:text-[var(--text-muted)]"
                style={{
                    background: "var(--input-bg)",
                    borderColor: "var(--input-border)",
                    color: "var(--text)",
                }}
            />

        </section>
    );
}

export default OrderNotes;