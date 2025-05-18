/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          "100%": { "background-position": "0% 0%" },
        },
        bubble: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "50%": { transform: "translateY(-30px) scale(1.2)", opacity: "0.5" },
          "100%": { transform: "translateY(-60px) scale(1)", opacity: "0" },
        },
      },
      animation: {
        gradient: "gradient 20s ease infinite",
        bubble: "bubble 10s infinite",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [],
};
