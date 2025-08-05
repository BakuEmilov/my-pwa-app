import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, type ManifestOptions } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
  theme_color: "#000000",
  background_color: "#000000",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  screenshots: [
    {
      src: "/public/screenshots/dekstop.png",
      type: "image/png",
      sizes: "2560  x  1424",
      form_factor: "wide",
    },
    {
      src: "/public/screenshots/mobile.png",
      type: "image/png",
      sizes: "434  x  938",
      form_factor: "narrow",
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "en-US",
  name: "Baiyr's app",
  short_name: "b app ",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html,css,js,ico,png,svg}"],
      },
      manifest: manifest,
    }),
  ],
});
