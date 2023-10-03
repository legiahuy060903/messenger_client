
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: "#FC8019",
        secondaryColor: "#fc8e32",
        borderSecondaryColor: "#fd9c4b",
        iconColor: 'rgb(170, 0, 255)'
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: '1280px'
    },
  },
  corePlugins: {
    preflight: false,
  },
};