/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-10px)', // Start slightly above
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)', // End at the original position
          },
        },
        flash: {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out', // Use ease-out for a smoother end
        flash: 'flash 1.5s ease-in-out',
      },
    },
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
