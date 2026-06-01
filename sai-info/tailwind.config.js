/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Brand palette derived from the logo
        brand: {
          50: '#eef4fb',
          100: '#dbe9f7',
          200: '#b6d3ef',
          300: '#8fbbe6',
          400: '#5f9adc',
          500: '#345f9a',
          600: '#2f568d',
          700: '#274972',
          800: '#213a58',
          900: '#17283a',
        },
        // Keep `primary` as an alias to brand for backward compatibility
        primary: {
          50: '#eef4fb',
          100: '#dbe9f7',
          400: '#5f9adc',
          500: '#345f9a',
          600: '#2f568d',
          700: '#274972',
          800: '#213a58',
          900: '#17283a',
        },
      },
      transitionProperty: {
        'theme': 'background-color, color',
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
