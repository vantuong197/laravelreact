import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'node:dns'
dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
        {find: '@', replacement:path.resolve(__dirname,'src/')}
    ]
  },
  server: {
    origin: 'http://127.0.0.1:8080',
  },
})
