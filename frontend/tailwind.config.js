// import { nextui } from '@nextui-org/react'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        error: '#dc2626',
      },
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      circle: 'circle',
    },
  },
  plugins: [require('daisyui') /*nextui()*/],
  daisyui: {
    themes: ['light'],
    base: true,
    styled: true,
    logs: false,
    prefix: 'daisy-',
  },
}
