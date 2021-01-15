const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      './layouts/**/*.html',
    ],
  },
  darkMode: 'media',
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray: colors.gray,
      yellow: colors.yellow,
      blue: {
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
      'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',],
    }
  },
  variants: {},
  plugins: [], // if we add forms, do it here
}
