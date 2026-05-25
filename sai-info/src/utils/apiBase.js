export function getApiBase() {
  if (import.meta.env.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }

  // Default to the public backend so local VS Code runs still target the live site.
  // Set VITE_API_BASE in a local .env file if you want to point to a private backend.
  return 'https://sai-infotech-webapp.onrender.com';
}