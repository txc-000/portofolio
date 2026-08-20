import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;
export const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "");

export function resolveUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  return `${apiOrigin}${path.startsWith("/") ? "" : "/"}${path}`;
}

const client = axios.create({
  baseURL: apiBaseUrl,
});

export default client;
