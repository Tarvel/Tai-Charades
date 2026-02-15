/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-cyan': '#00ffff',
                'neon-magenta': '#ff00ff',
                'neon-lime': '#00ff00',
                'retro-black': '#000000',
            },
            fontFamily: {
                'pixel': ['"Press Start 2P"', 'cursive'],
            },
            borderWidth: {
                '4': '4px',
            },
            boxShadow: {
                'retro': '4px 4px 0px 0px rgba(0,0,0,1)',
                'retro-raised': '4px 4px 0px 0px rgba(0,0,0,1), inset -2px -2px 0px 0px rgba(255,255,255,0.3)',
            }
        },
    },
    plugins: [],
}
