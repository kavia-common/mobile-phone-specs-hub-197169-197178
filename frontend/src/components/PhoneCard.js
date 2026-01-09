import React from "react";
import { Link } from "react-router-dom";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  } catch {
    return String(value);
  }
}

/**
 * PUBLIC_INTERFACE
 * PhoneCard
 * Summary card for a phone post.
 */
export default function PhoneCard({ phone }) {
  if (!phone) return null;

  return (
    <article className="card">
      <div className="cardBody">
        <div className="cardTitleRow">
          <div>
            <h3 className="cardTitle">{phone.title}</h3>
            <div className="cardMeta">
              {phone.brand ? `${phone.brand} • ` : ""}
              {formatDate(phone.publishedAt)}
            </div>
          </div>
        </div>

        {phone.excerpt ? <div className="cardMeta">{phone.excerpt}</div> : null}

        {phone.tags?.length ? (
          <div className="tagRow" aria-label="Tags">
            {phone.tags.slice(0, 4).map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <Link className="cardLink" to={`/phone/${phone.slug}`} aria-label={`View specs for ${phone.title}`}>
          View specs <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
