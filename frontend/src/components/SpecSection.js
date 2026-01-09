import React from "react";

/**
 * Convert nested section objects into key/value pairs suitable for display.
 */
function toRows(specSection) {
  if (!specSection || typeof specSection !== "object") return [];
  return Object.entries(specSection)
    .filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "")
    .map(([k, v]) => ({
      key: k,
      value: typeof v === "string" || typeof v === "number" ? String(v) : JSON.stringify(v)
    }));
}

function labelize(key) {
  return String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
}

/**
 * PUBLIC_INTERFACE
 * SpecSection
 * Renders a card-like section for a group of specs.
 */
export default function SpecSection({ title, specs }) {
  const rows = toRows(specs);

  return (
    <section className="specSection" aria-label={title}>
      <h3 className="specTitle">{title}</h3>
      {rows.length === 0 ? (
        <div className="cardMeta">No details available.</div>
      ) : (
        <ul className="specList">
          {rows.map((r) => (
            <li className="specRow" key={r.key}>
              <span className="specKey">{labelize(r.key)}</span>
              <span>{r.value}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
