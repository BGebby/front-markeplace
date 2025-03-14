import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.VITE_PORT) || 5173, // ✅ Convierte a número
  },
  define: {
    "process.env": process.env, // Asegura que process.env esté disponible
  },
});