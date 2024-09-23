/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '160': '40rem',
      },
      maxWidth: {
        '160': '40rem',
      },
      colors: {
        buttonBorder: "rgba(249, 210, 159, 1)",
        unselected: "rgba(159, 147, 139, 1)",
        incorrectStart: "rgba(246, 184, 104, 1)", // Starting RGB color (e.g., red)
        incorrectEnd: "rgba(238, 107, 45, 1)", // Ending RGB color (e.g., blue)
      },
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [],
};
