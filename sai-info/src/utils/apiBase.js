export function getApiBase() {
  if (import.meta.env.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }

  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000';
    }

    // For public deployments, prefer the current origin when the API is proxied
    // behind the same domain. Override with VITE_API_BASE when the backend is hosted separately.
    return window.location.origin;
  }

  return 'http://localhost:5000';
}