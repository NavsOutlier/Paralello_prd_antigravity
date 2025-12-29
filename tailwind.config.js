/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        secondary: '#475569',
        background: '#F1F5F9',
        border: '#E2E8F0',
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}

