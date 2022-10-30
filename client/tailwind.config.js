/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "red-netflix": "#E50913",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
