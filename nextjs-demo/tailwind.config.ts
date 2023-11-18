import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'arial': ['Arial', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue: {
          200: '#1997B7',
          400: '#0087AA',
        },
        gray: {
          900: '#4A4A4A',
        },
        white: {
          100: '#FFFFFF',
        }
      },
      fontSize: {
        '16': '16px',
        '38': '38px',
      }
    },
  },
  plugins: [],
}
export default config
