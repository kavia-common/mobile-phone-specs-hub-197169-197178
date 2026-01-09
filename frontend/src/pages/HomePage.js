import React, { useEffect, useMemo, useState } from "react";
import PhoneGrid from "../components/PhoneGrid";
import SearchBar from "../components/SearchBar";
import { getPhones, hasBackendConfigured } from "../services/phoneApi";

/**
 * PUBLIC_INTERFACE
 * HomePage
 * Displays recent phone posts and a search bar (client-side + optional server-side).
 */
export default function HomePage() {
  const [query, setQuery] = useState("");
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // If backend is configured, the service may already apply search server-side.
  // If backend isn't configured (mock), we still want snappy filtering client-side.
  const backendConfigured = useMemo(() => hasBackendConfigured(), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErrorMsg("");

      try {
        const data = await getPhones({ search: backendConfigured ? query : "" });
        if (cancelled) return;
        setPhones(data);
      } catch (err) {
        if (cancelled) return;
        setErrorMsg("Failed to load phones. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [query, backendConfigured]);

  const filteredPhones = useMemo(() => {
    if (backendConfigured) return phones;

    const q = query.trim().toLowerCase();
    if (!q) return phones;

    return phones.filter((p) => {
      const haystack = [p.title, p.brand, p.excerpt, ...(p.tags || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [phones, query, backendConfigured]);

  return (
    <div>
      <section className="hero" aria-label="Homepage hero">
        <h1 className="heroTitle">Recent phone spec posts</h1>
        <p className="heroSubtitle">
          Search and open individual pages to view camera, display, chipset, memory, storage, and battery specs.
        </p>

        <SearchBar initialValue={query} onSearchChange={setQuery} />

        <div style={{ height: 10 }} aria-hidden="true" />

        <div className="pill" title="Backend configuration info">
          {backendConfigured ? "Server search enabled" : "Using built-in sample data"}
        </div>
      </section>

      {loading ? (
        <div className="stateBox" role="status" aria-live="polite">
          Loading phones…
        </div>
      ) : errorMsg ? (
        <div className="stateBox errorBox" role="alert">
          {errorMsg}
        </div>
      ) : (
        <PhoneGrid phones={filteredPhones} />
      )}
    </div>
  );
}
