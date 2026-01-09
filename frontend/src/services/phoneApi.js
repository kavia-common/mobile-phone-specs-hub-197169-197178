import { MOCK_PHONES } from "../data/mockPhones";

function getEnvApiBase() {
  const raw = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "";
  return raw.trim().replace(/\/+$/, "");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizePhone(p) {
  return {
    slug: p.slug,
    title: p.title,
    brand: p.brand,
    publishedAt: p.publishedAt,
    excerpt: p.excerpt,
    tags: Array.isArray(p.tags) ? p.tags : [],
    specs: p.specs || {}
  };
}

function filterPhonesLocal(phones, q) {
  const query = (q || "").trim().toLowerCase();
  if (!query) return phones;

  return phones.filter((p) => {
    const haystack = [
      p.title,
      p.brand,
      p.excerpt,
      ...(p.tags || []),
      // allow searching within common spec strings
      p?.specs?.chipset?.name,
      p?.specs?.display?.type
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

/**
 * NOTE about backend integration:
 * If REACT_APP_API_BASE (or REACT_APP_BACKEND_URL) is set, this adapter will call:
 * - GET {base}/phones?search=...  (optional, used when searching)
 * - GET {base}/phones            (fallback list endpoint)
 * - GET {base}/phones/{slug}     (detail)
 *
 * If those endpoints don't exist, the UI will automatically fall back to mock data.
 */

// PUBLIC_INTERFACE
export async function getPhones({ search } = {}) {
  /** Fetch list of phones, optionally server-side search when configured. */
  const base = getEnvApiBase();

  // No backend configured -> use mock (fast, deterministic)
  if (!base) {
    const phones = MOCK_PHONES.map(normalizePhone);
    return filterPhonesLocal(phones, search);
  }

  // Backend configured -> try to fetch, otherwise fall back to mock
  try {
    // Try search endpoint first if search is present
    if (search && search.trim()) {
      const url = `${base}/phones?search=${encodeURIComponent(search.trim())}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      const phones = (Array.isArray(data) ? data : data?.items || []).map(normalizePhone);
      return phones;
    }

    // Plain list endpoint
    const res = await fetch(`${base}/phones`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    const phones = (Array.isArray(data) ? data : data?.items || []).map(normalizePhone);
    return phones;
  } catch (err) {
    // Small artificial delay so loading states are visible in preview
    await sleep(250);
    const phones = MOCK_PHONES.map(normalizePhone);
    return filterPhonesLocal(phones, search);
  }
}

// PUBLIC_INTERFACE
export async function getPhoneBySlug(slug) {
  /** Fetch a single phone by slug. Falls back to mock data if backend not configured/available. */
  const base = getEnvApiBase();
  const safeSlug = String(slug || "").trim();

  if (!safeSlug) return null;

  if (!base) {
    return MOCK_PHONES.map(normalizePhone).find((p) => p.slug === safeSlug) || null;
  }

  try {
    const res = await fetch(`${base}/phones/${encodeURIComponent(safeSlug)}`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    return normalizePhone(data);
  } catch (err) {
    await sleep(250);
    return MOCK_PHONES.map(normalizePhone).find((p) => p.slug === safeSlug) || null;
  }
}

// PUBLIC_INTERFACE
export function hasBackendConfigured() {
  /** Returns true if a backend URL is configured via env vars. */
  return Boolean(getEnvApiBase());
}
