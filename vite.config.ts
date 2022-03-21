import { defineConfig } from "vite";
import path from "path";
// console.log(fs);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@hpstream": path.resolve(__dirname, "packages"),
    },
  },
  // build: {
  //   rollupOptions: {
  //     input: inputFn(),
  //   },
  // },
  plugins: [],
});
