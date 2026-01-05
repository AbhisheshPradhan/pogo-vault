import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: [
            { find: '@features', replacement: '/src/features' },
            { find: '@utils', replacement: '/src/utils' },
            { find: '@services', replacement: '/src/services' },
            {
                find: '@shared',
                replacement: path.resolve(__dirname, '../shared'),
            },
            { find: '@assets', replacement: '/src/assets' },
        ],
    },
});
