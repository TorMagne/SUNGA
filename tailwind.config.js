/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: "'Sora', sans-serif",
        raleway: "'Raleway', sans-serif;",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#7c3aed',
          secondary: '#7c3aed',
          accent: '#1FB2A6',
          neutral: '#ffffff',
          'base-100': '#F5F5F5',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
