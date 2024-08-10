/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        background: "#000000",
        "secondary-bg": "#0a0a0a",
        "secondary-border": "#242424",
        "secondary-bg-hover": "#1f1f1f",
        gray: "#847f90",
        "gray-hover": "#171717",
        "primary-hover": "#555555",
        "link-gray": "#9b9b9b",
        "navigation-bg": "#020202",
        "link-gray-hover": "#1f1f1f",
        "gray-border": "#2e2e2e",
        "dropdown-bg": "#010101",
        "tab-bg": "#1f1f1f",
        white: "#fcfcfc",
        "primary-bg": "#ededed",
        "primary-bg-hover": "#cccccc",
        "primary-text": "#0e0e0e",
      },
      height: {
        "navbar-height": "64px",
      },
    },
  },
  plugins: [],
};
