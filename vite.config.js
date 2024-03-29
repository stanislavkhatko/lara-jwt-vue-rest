import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        server: {
            deps: {
                inline: ['vuetify'],
            },
        },
    },
    plugins: [
        vue(),
        laravel({
            input: ['resources/css/style.scss', 'resources/js/main.js'],
            refresh: true,
        }),
    ],
})
;
