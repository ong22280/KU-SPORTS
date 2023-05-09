/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
  screens: {
    sm: "375px",
    // => @media (min-width: 375px) { ... }

    md: "768px",
    // => @media (min-width: 768px) { ... }

    lg: "992px",
    // => @media (min-width: 992px) { ... }

    xl: "1200px",
    // => @media (min-width: 1200px) { ... }
  },
  // fontSize: is used to define the font sizes for your project
  fontSize: {
    "2xsm": "10px",
    "2xl": "22px",
    "3xl": "25px",
    "4xl": "32px",
    "5xl": "40px",
    "6xl": "50px",
    "7xl": "70px",
  },
  plugins: [],
};
