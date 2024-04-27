import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-red-500', 
    'bg-red-500/90', 
    'bg-red-500/80', 
    'bg-red-500/70', 
    'bg-red-500/60', 
    'bg-red-500/50', 
    'bg-red-500/40', 
    'bg-red-500/30', 
    'bg-red-500/20', 
    'bg-red-500/10', 
    'bg-orange-500', 
    'bg-orange-500/90', 
    'bg-orange-500/80', 
    'bg-orange-500/70', 
    'bg-orange-500/60', 
    'bg-orange-500/50', 
    'bg-orange-500/40', 
    'bg-orange-500/30', 
    'bg-orange-500/20', 
    'bg-orange-500/10',
    'bg-yellow-500', 
    'bg-yellow-500/90', 
    'bg-yellow-500/80', 
    'bg-yellow-500/70', 
    'bg-yellow-500/60', 
    'bg-yellow-500/50', 
    'bg-yellow-500/40', 
    'bg-yellow-500/30', 
    'bg-yellow-500/20', 
    'bg-yellow-500/10',
    'bg-green-500', 
    'bg-green-500/90', 
    'bg-green-500/80', 
    'bg-green-500/70', 
    'bg-green-500/60', 
    'bg-green-500/50', 
    'bg-green-500/40', 
    'bg-green-500/30', 
    'bg-green-500/20', 
    'bg-green-500/10',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a991f7",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light",
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
export default config;