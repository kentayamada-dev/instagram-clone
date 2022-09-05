/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,jsx}"],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
