/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-screen": "url(/images/login-right.png)",
      },
      screens: {
        md: "955px",
      },
      colors: {
        "bg-verticalMenu": "#f2f2f4",
        "bg-mainLayout": "#f6f8fa",
        "bg-hoverVertical": "#fdfdfd",
      },
    },
  },
  plugins: [],
};
