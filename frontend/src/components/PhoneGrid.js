import React from "react";
import PhoneCard from "./PhoneCard";

/**
 * PUBLIC_INTERFACE
 * PhoneGrid
 * Responsive grid layout for phone cards.
 */
export default function PhoneGrid({ phones }) {
  if (!phones || phones.length === 0) {
    return (
      <div className="stateBox" role="status" aria-live="polite">
        No results. Try a different search query.
      </div>
    );
  }

  return (
    <section className="grid" aria-label="Recent phone posts">
      {phones.map((p) => (
        <PhoneCard key={p.slug} phone={p} />
      ))}
    </section>
  );
}
