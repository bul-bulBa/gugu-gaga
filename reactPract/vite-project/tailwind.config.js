/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        // Use the CSS var directly — our CSS stores the color as a hex (#rrggbb)
        // and vendor CSS defines `.bg-primary` so add a unique alias `app-primary` to avoid collisions
        primary: 'var(--primary-color)',
        'app-primary': 'var(--primary-color)'
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}