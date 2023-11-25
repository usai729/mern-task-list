/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      borderWidth: {
        0: "none",
        1: "1px",
        "1-5": "1.5px",
      },
    },
  },
  plugins: [],
};
