const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#292B2F',
        'dark-secondary': '#2E3036',
        'dark-third': '#37393F',
        'light-primary': '#EFEFEF',
        'light-secondary': '#F2F3F5',
        'light-third': '#FFFFFF',
        'attention-primary': '#FFB500',
        'attention-secondary': '#00BA4A',
        'attention-third': '#CE331D',
        'color-isil': '#00adee',
        auth: '#202433',
        inputs: '#33394F'
      },
      backgroundImage: {
        'auth-image': 'url(/images/auth.jpg)'
      },
      fontSize: {
        'head-1': '1.5rem',
        'head-2': '1.125rem',
        'head-3': '0.875rem',
        body: '0.75rem',
        caption: '0.688rem'
      },
      gridRow: {
        'dash-greeting': '1 / 2',
        'dash-statistics': '2 / 3'
      },
      gridColumn: {
        'dash-greeting': '1 / 3',
        'dash-statistics': '1 / 3'
      },
      animation: {
        float: 'float 6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translate(0px,0px)'
          },
          '50%': {
            transform: 'translate(-10px,-20px)'
          }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: '#FFB500'
          },
          secondary: {
            DEFAULT: '#00BA4A'
          },
          background: '#292B2F'
        }
      }
    }
  })]
}

