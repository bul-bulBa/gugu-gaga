/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'app-primary': 'var(--primary-color)',
        'app-background': 'var(--background)',
        'app-foreground': 'var(--foreground)',
        'app-border': 'var(--border)'
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}