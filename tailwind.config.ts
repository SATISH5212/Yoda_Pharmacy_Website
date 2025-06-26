import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const dynamicThemePatterns = ["custom-theme-1"];
const config: Config = {
 

  plugins: [require("tailwindcss-motion")],
};

export default config;