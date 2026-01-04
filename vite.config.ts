import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: "window",
      "process.env.CANISTER_ID_TODO": JSON.stringify(env.CANISTER_ID_TODO),
      "process.env.DFX_NETWORK": JSON.stringify(env.DFX_NETWORK),
    },
  }
})
