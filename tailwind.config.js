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
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        twinkle: {
          '0%': {
            color: '#fcc20d',
            transform: 'scale(1)',
          },
          '50%': {
            color: '#fcdc58',
            transform: 'scale(1.15)',
          },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out',
        flash: 'flash 1.5s ease-in-out',
        float: 'float 8s infinite',
        slideUp: 'slideUp 0.8s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        twinkle: 'twinkle 1.5s infinite alternate ease-in-out',
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '3rem',
        '2xl': '6rem',
      },
      center: true,
    },
  },
  plugins: [],
}
