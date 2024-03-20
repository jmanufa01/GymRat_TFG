/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      margin: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/5": "40%",
      },
      height: {
        120: "30rem",
      },
      colors: {
        cyan: "#38ECE7",
      },
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
    },
  },
  plugins: [],
};
