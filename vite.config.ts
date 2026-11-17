import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/elearning/",
  plugins: [react()],
  server: {
    // Bind to 0.0.0.0 (not just localhost) so the dev server is reachable
    // from other machines on the LAN at http://<this-machine's-IP>:5174.
    host: true,
    // In production this app is one IIS site (Node + the React build
    // together), so the frontend always calls a relative "/api" and
    // "/uploads" — no host/IP ever gets baked into anything. Proxying those
    // same paths to the backend here makes local dev behave identically,
    // instead of needing VITE_API_URL hardcoded to a specific machine.
    proxy: {
      "/api": "http://localhost:4000",
      "/uploads": "http://localhost:4000",
      // Socket.IO's own endpoint — also same-origin in production (one IIS
      // site), so it needs the same dev-proxy treatment as /api and /uploads,
      // plus `ws: true` since this one is a WebSocket upgrade, not a plain
      // HTTP request. Missing this silently breaks every real-time feature
      // (live waiting rooms, "examination started", notifications) in dev
      // without erroring anywhere obvious.
      "/socket.io": { target: "http://localhost:4000", ws: true },
    },
  },
});
