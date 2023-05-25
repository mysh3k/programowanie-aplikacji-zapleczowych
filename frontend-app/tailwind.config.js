/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bkg: {
          1: "#242424",
          2: "#1e1e1e",
        },

        accent: {
          1: "#646cff",
        },
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
