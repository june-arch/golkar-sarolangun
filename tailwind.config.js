/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        golkar: "url('/images/golkar-with-foto.webp')",
        'golkar-grey': "url('/images/golkar-grey.png')",
        'golkar-video': 'url(/images/golkar-video.png)',
        footer: 'url(/images/footer.png)',
      },
      height: (theme) => ({
        auto: 'auto',
        ...theme('spacing'),
        full: '100%',
      }),
      minHeight: (theme) => ({
        0: '0',
        ...theme('spacing'),
        full: '100%',
      }),
      screens: {
        xs: '440px',
        sm: '640px',
        md: '768px',
        mdt: '984px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans: ['Roboto'],
      },
      colors: {
        primary: '#FFC300',
        secondary: '#2F4858',
        other: '#2C4062',
        bgSecondary: '#F4F4FC',
        dark: '#222222',
      },
      fontSize: {
        header: [
          '18px',
          {
            lineHeight: '21px',
          },
        ],
        'header-sub': [
          '11px',
          {
            lineHeight: '13px',
          },
        ],
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  mode: 'jit',
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-scoped-groups')({
      groups: ['one', 'two'],
    }),
  ],
};
