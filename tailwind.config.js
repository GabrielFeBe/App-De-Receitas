/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        xxs: '320px',
        smd: '400px',
      },
    },
  },
  plugins: [],
};
