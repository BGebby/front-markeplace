import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log("🔍 VITE_API_URL desde process.env:", process.env.VITE_API_URL);

export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL || "NO_ENV_FOUND"),
  },
});
