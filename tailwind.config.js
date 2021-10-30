const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  purge: [
    "./content/**/*.md",
    "./content/**/*.html",
    "./layouts/**/*.html"
  ],
  darkMode: 'media',
  theme: {
    extend: {
      keyframes: ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
      animation: {
        fade: 'fadeIn 1s ease-in-out',
      },
    },
    fontWeight: {
      normal: 400,
      bold: 625, // not default of 700
      black: 900,
    },
    fill: theme => ({
      current: 'currentColor',
      white: theme('colors.white'),
    }),
    fontSize: {
      'fn': '.65rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      blueGray: colors.blueGray,
      gray: colors.gray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      green: colors.green,
      teal: colors.teal,
      sky: colors.sky,
      blue: {
        '50': '#e6f9ff',
        '100': '#bbeeff',
        '200': '#00aaff',
        '300': '#0088ff',
        '400': '#0033ff',
        '500': '#0000ff',
        '600': '#0000bb',
        '700': '#0000aa',
        '800': '#000088',
        '900': '#000066',
      },
    },
    fontFamily: {
      'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'Noto Sans', 'Segoe UI', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'serif': ['ui-serif', 'Georgia', 'Cambria', 'Times', 'Times New Roman', 'serif'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
  },
  variants: {
    logical: [
      'responsive',
      'hover'
    ],
  },
  plugins: [
    require('tailwindcss-logical'),
  ], // if we add forms, do it here
}
