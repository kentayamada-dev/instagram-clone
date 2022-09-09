/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
