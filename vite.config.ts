import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import dts from 'vite-plugin-dts';


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "@wy/react-qr",
      formats: ['es', 'umd'],
      fileName: (format) => `react-qr.${format}.js`
    },

    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "jsqr"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          'react-dom': 'ReactDOM',
          jsqr: 'jqQR'
        },
      },
    },
  },
  plugins: [react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
})
