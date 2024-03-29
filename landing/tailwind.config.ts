import type { Config } from "tailwindcss";
import flowbite from 'flowbite/plugin'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    colors: {
      'peach-fuzz': "#fed5bc"
    }
  },
  plugins: [flowbite],
};

export default config;
