import { useEffect, useState } from "react";

function currentSlug(): string {
  return decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
}

export function useHashRoute(): [string, (slug: string) => void, (slug: string) => void] {
  const [slug, setSlug] = useState(currentSlug());

  useEffect(() => {
    const onHashChange = () => setSlug(currentSlug());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (nextSlug: string) => {
    const encoded = `#/${encodeURIComponent(nextSlug)}`;
    if (window.location.hash === encoded) return;
    window.location.hash = encoded;
  };

  const replace = (nextSlug: string) => {
    const encoded = `#/${encodeURIComponent(nextSlug)}`;
    if (window.location.hash === encoded) return;
    const url = `${window.location.pathname}${window.location.search}${encoded}`;
    window.history.replaceState(null, "", url);
    setSlug(nextSlug);
  };

  return [slug, navigate, replace];
}
