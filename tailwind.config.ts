import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    fontSize: {
      xs: 'calc(10px + .8vw)',
      sm: 'calc(12px + 1vw)',
      base: 'calc(16px + 1.5vw)',
      xl: 'calc(20px + 1.75vw)',
      '2xl': 'calc(32px + 2vw)',
      '3xl': 'calc(40px + 3vw)',
      '4xl': 'calc(48px + 4vw)',
      '5xl': 'calc(56px + 5vw)',
    }
  },
  plugins: [require('preline/plugin')],
};
export default config;
