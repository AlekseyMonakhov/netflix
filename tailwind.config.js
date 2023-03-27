/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/images/hero.jpg')",
      }
    },
  },
  plugins: [],
}
