/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        // Purple
        primary: {
          50: '#AEEDFF',
          100: '#9D8DCE',
          200: '#917EC8',
          300: '#765fba',
          400: '#523D8F',
        },
        // Charcoal
        secondary: {
          50: '#F4F4F5',
          100: '#EAEAEB',
          200: '#BFBFC4',
          300: '#808089',
          400: '#3b3b40',
          500: '#313135',
          600: '#27272A',
          700: 'rgba(49, 49, 53, 0.95);',
        },
      },
    },
  },
  plugins: [],
};
