/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '4rem',
        lg: '5rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}
