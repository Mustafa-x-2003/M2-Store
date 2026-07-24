import React from "react";

export default function Items({ title, icon, children }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span>{icon}</span>
        <h2 className="text-lg font-bold text-[var(--text)]">{title}</h2>
      </div>
      {children}
    </div>
  );
}
