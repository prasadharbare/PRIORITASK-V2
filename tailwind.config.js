/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  exports: {
    daisyui: {
      themes: ["aqua"],
    },
  },
  plugins: [require("daisyui")],
};