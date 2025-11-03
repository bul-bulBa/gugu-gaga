/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
        colors: {
            bg: 'rgb(var(--bg) / <alpha-value>)',
            text: 'rgb(var(--text) / <alpha-value>)',
            border: 'rgb(var(--border) / <alpha-value>)',
            primary: 'rgb(var(--primary) / <alpha-value>)',
        },
    },
  },
  plugins: [],
  darkMode: 'class'
}