/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B3737',
        accent: '#FF6B35',
        background: '#F9F8F6',
        surface: '#FFFFFF',
        border: 'rgba(27, 55, 55, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(27, 55, 55, 0.05)',
        accent: '0 8px 24px -4px rgba(255, 107, 53, 0.2)',
      },
    },
  },
  plugins: [],
}
