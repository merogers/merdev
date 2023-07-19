/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        // Blue
        primary: {
          100: '#765fba',
          200: '#8570c2',
        },
        // Grey
        secondary: {
          100: '#313135',
          200: '#3b3b40',
          300: 'rgba(49, 49, 53, 0.95);',
        },
        accent: {
          100: '#bdadea',
          200: '#f3f1f9',
        },
        error: {
          100: '#ff3347',
          200: '#ffebed',
        },
        background: {
          100: '#f4f4f5',
        },
      },
    },
  },
  plugins: [],
};
