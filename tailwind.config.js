/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          50: "#FFF0EA",
          100: "#FEE0D3",
          200: "#FCC2A7",
          300: "#FBA37C",
          400: "#F98550",
          500: "#F86624",
          600: "#BA4D1B",
          700: "#7C3312",
          800: "#3E1A09",
          900: "#190A04",
        }
      }
    },
  },
  plugins: [],
}