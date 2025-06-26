// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'



export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [tsConfigPaths(), tanstackStart(),],
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// import path from 'path'

// interface ImportMetaEnv {
//   readonly VITE_PUBLIC_API_URL : string;
// }

// interface ImportMeta {
//   readonly env : ImportMetaEnv;
// }
// // https://vitejs.dev/config/
// export default defineConfig({
//   define: {
//     "process.env.NODE_ENV" : '"development"',
//   },

//   plugins: [
//     tailwindcss(),
//     TanStackRouterVite({
//       target: 'react',
//       autoCodeSplitting: true,
//     }),
//     react(),
//   ],
//   resolve : {
//     alias : {
//       "@" : path.resolve(__dirname,  "./src"),
//     }
//   },
//   pr
// })