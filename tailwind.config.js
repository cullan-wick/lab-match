/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'uw-red': '#C5050C',
        'uw-dark': '#9b0000',
      }
    },
  },
  plugins: [],
}
