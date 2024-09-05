/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    colors: {
      primary: "hsl(220, 98%, 61%)",
      gradient: {
        start: "hsl(192, 100%, 67%)",
        end: "hsl(280, 87%, 65%)",
      },
      gray: {
        100: "hsl(0, 0%, 98%)",
        200: "hsl(236, 33%, 92%)",
        300: "hsl(233, 11%, 84%)",
        400: "hsl(236, 9%, 61%)",
        500: "hsl(234, 39%, 85%)",
        600: "hsl(234, 11%, 52%)",
        700: "hsl(233, 14%, 35%)",
        800: "hsl(235, 19%, 35%)",
        900: "hsl(235, 21%, 11%)",
      },
      blue: {
        900: "hsl(235, 24%, 19%)",
      },
    },

    extend: {
      backgroundImage: {
        "todo-mobile-light": "url('/images/bg-mobile-light.avif')",
        "todo-mobile-dark": "url('/images/bg-mobile-dark.avif')",
        "todo-desktop-light": "url('/images/bg-desktop-light.avif')",
        "todo-desktop-dark": "url('/images/bg-desktop-dark.avif')",
      },
    },
  },
  plugins: [],
};
