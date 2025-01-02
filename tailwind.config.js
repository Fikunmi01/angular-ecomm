/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Montserrat", sans-serif',
        serif: '"Lato", sans-serif',
        ari: '"Arimo", sans-serif',
        bal: '"Baloo Paaji 2", sans-serif',
        arim: '"Arimo", serif',
      },
    },
  },
  plugins: [],
};
