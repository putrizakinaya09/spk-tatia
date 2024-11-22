/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Tambahkan path ke file React
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Tambahkan plugin DaisyUI

};
