export function getApiBase() {
  if (import.meta.env.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }

  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000';
    }

    // Public frontend deployment should point to the Render backend by default.
    // Override with VITE_API_BASE if you move the API to another host.
    return 'https://sai-infotech-webapp.onrender.com';
  }

  return 'https://sai-infotech-webapp.onrender.com';
}