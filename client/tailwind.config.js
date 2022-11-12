/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        color_bg: "#2a2a2e",
        white: "#ffffff",
        brown: "#5C3D2E",
        light_brown: "#865439",
        green: "#6AA942",
        light_green: "#A3DA8D",
        beige: "#dba25a",
        color_light: "#FFF1BD",
        gray: "#3C4048",
      },
      backgroundImage: {
        landing:
          "url('https://res.cloudinary.com/dfbxjt69z/image/upload/v1667056183/cattle/pexels-pixabay-162240_akbobi.jpg')",
        home: "url('https://res.cloudinary.com/dfbxjt69z/image/upload/v1667056185/cattle/cow-g2aa95d650_1920_zyzlwk.jpg')",
        home1:
          "url('https://res.cloudinary.com/dfbxjt69z/image/upload/v1667154569/cattle/pexels-mark-stebnicki-2252557_gxlkhg.jpg')",
      },
      fontFamily: {
        sans: ["Helvetica", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0 4px 3px -2px rgba(153,147,147,0.58) ",
      },
    },
  },
  plugins: [],
};
