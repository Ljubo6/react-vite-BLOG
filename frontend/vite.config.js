import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
		proxy: {
			'/api/register': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
			'/api/login': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
			'/api/logout': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
			'/api/users': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
			'/api/posts': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
		},
	},
})


