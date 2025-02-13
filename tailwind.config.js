/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bluePrimary: "#090055",
        blueSecondary: "#4780D4",
        blueTertiary: "#144286",
        customGray: "#6D6D6D",
      },
    },
  },
  plugins: [],
};