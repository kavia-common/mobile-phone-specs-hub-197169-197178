import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpecSection from "../components/SpecSection";
import { getPhoneBySlug } from "../services/phoneApi";

/**
 * PUBLIC_INTERFACE
 * PhoneDetailPage
 * Displays a single phone spec page.
 */
export default function PhoneDetailPage() {
  const { slug } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErrorMsg("");

      try {
        const data = await getPhoneBySlug(slug);
        if (cancelled) return;
        setPhone(data);
      } catch (err) {
        if (cancelled) return;
        setErrorMsg("Failed to load phone details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="stateBox" role="status" aria-live="polite">
        Loading specs…
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="stateBox errorBox" role="alert">
        {errorMsg}{" "}
        <span>
          <Link to="/">Return home</Link>
        </span>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="stateBox" role="status" aria-live="polite">
        Phone not found. <Link to="/">Return home</Link>
      </div>
    );
  }

  const specs = phone.specs || {};

  return (
    <div>
      <div className="detailHeader">
        <div>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{phone.title}</span>
          </div>
          <h1 className="detailTitle">{phone.title}</h1>
          <p className="detailSubtitle">{phone.brand ? `${phone.brand} • ` : ""}{phone.excerpt || "Full specification overview."}</p>
        </div>
      </div>

      <div className="specGrid" aria-label="Phone specifications">
        <SpecSection title="Display" specs={specs.display} />
        <SpecSection title="Chipset" specs={specs.chipset} />
        <SpecSection title="Camera" specs={specs.camera} />
        <SpecSection title="Memory & Storage" specs={specs.memory} />
        <SpecSection title="Battery" specs={specs.battery} />
      </div>

      <p className="footerNote">
        Data source: {process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL ? "API (with mock fallback)" : "Built-in sample dataset"}.
      </p>
    </div>
  );
}
