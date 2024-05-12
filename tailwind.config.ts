/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
    },
    extend: {
      colors: {
        "text-primary": "rgb(var(--text-primary))",
        "primary-50": "rgb(var(--primary-50))",
        "primary-100": "rgb(var(--primary-100))",
        "primary-200": "rgb(var(--primary-200))",
        "primary-300": "rgb(var(--primary-300))",
        "primary-400": "rgb(var(--primary-400))",
        "primary-500": "rgb(var(--primary-500))",
        "primary-600": "rgb(var(--primary-600))",
        "primary-700": "rgb(var(--primary-700))",
        "primary-800": "rgb(var(--primary-800))",
        "primary-900": "rgb(var(--primary-900))",
        "primary-950": "rgb(var(--primary-950))",
        "secondary-0": "rgb(var(--secondary-0))",
        "secondary-50": "rgb(var(--secondary-50))",
        "secondary-100": "rgb(var(--secondary-100))",
        "secondary-200": "rgb(var(--secondary-200))",
        "secondary-300": "rgb(var(--secondary-300))",
        "secondary-400": "rgb(var(--secondary-400))",
        "secondary-500": "rgb(var(--secondary-500))",
        "secondary-600": "rgb(var(--secondary-600))",
        "secondary-700": "rgb(var(--secondary-700))",
        "secondary-800": "rgb(var(--secondary-800))",
        "secondary-900": "rgb(var(--secondary-900))",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
