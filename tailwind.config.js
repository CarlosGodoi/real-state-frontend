/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DAD10B",
        secondary: "#79A072",

        dark_secondary: "#959366",
        medium_secondary: "#B3B17B",
        medium_blue: "#23243F",

        light_blue: "#00B7C4",

        dark_blue: "#31364E",
      },
      backgroundImage: {
        login_bg: "url(../../public/assets/login_bg1.jpeg)",
        home_bg: "url(../../public/assets/home_bg1.jpeg)",
        contact_bg: "url(../../public/assets/contact_img.jpg)",
      },
      screens: {
        notebook_13p: { max: "1367px" },

        desktop: { max: "1279px" },

        laptop: { max: "1023px" },

        ipad: { max: "767px" },

        tablet: { max: "639px" },
        //mobo2
        iphone_XR: { max: "415px" },
        //mobo
        iphone_SE: { max: "376px" },
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tw-elements/dist/plugin.cjs")],
};
