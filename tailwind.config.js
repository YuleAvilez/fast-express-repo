/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: { 900: '#0E1A2B', 800: '#16263C', 600: '#3C4D66', 400: '#7B8AA1', 200: '#D5DBE5', 100: '#E9EDF3', 50: '#F5F7FA' },
        route: { 600: '#0B8577', 500: '#10A392', 100: '#D6F2EE', 50: '#EEFAF8' },
        signal: { 600: '#C2570A', 500: '#F28B1F', 100: '#FDE9CF' },
      },
      boxShadow: { panel: '0 1px 0 rgba(14,26,43,.04), 0 12px 32px -12px rgba(14,26,43,.18)' },
    },
  },
  plugins: [],
};
