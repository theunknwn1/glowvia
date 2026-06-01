/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'brand-bg-primary': '#F9F3EE',
        'brand-bg-secondary': '#F4EAEB',
        'brand-text': '#1F1F1F',
        'brand-gold': '#C8A56A',
        'brand-rose': '#8E4A5B',
        'brand-sage': '#A9B4A2',
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'body': ['"Poppins"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

