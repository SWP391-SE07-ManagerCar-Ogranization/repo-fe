/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    letterSpacing: {
      tightest: "1.8px",
    },
    fontFamily: {
      sora: ["Sora"],
      volkhov: ["Volkhov"],
      casanova: ["Casanova Scotia"],
    },
    extend: {
      backgroundImage:{
        'parallax': 'url("../src/assets/images/car1.png")'
      },
      screens: {
        mobile: "400px",
        ipad: "768px",
        desktop: "1100px",
      },
      border: {},
      fontSize: {
        13: "13px",
        14: "14px",
        16: "16px",
        20: "20px",
        26: "26px",
        24: "24px",
        32: "32px",
        36: "36px",
        48: "48px",
        72: "72px",
        102: "102px",
      },
      boxShadow: {
        md: "6px 6px 16px 0 rgba(0, 0, 0, 0.25),-4px -4px 12px 0 rgba(255, 255, 255, 0.3);",
      },
    },
  },
  plugins: [],
});
