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
    },
  },
  plugins: [],
};
