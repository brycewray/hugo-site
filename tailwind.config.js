/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  content: [
    "./content/**/*.md",
    "./themes/twcss/layouts/**/*.html"
  ],
  darkMode: 'media',
  theme: {
    fill: theme => ({
      current: 'currentColor',
			black: theme('colors.black'),
      white: theme('colors.white'),
			blue300: theme('colors.blue.300'), // bkgd of "BW" SVG logo
			blue400: theme('colors.blue.400'),
			blue600: theme('colors.blue.600'),
			sky100: theme('colors.sky.100'),
			sky300: theme('colors.sky.300')
    }),
		/*
    fontWeight: {
      normal: 400,
      bold: 625, // not default of 700
      black: 900,
    },
		*/
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
			current: 'currentColor',
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray: colors.gray,
      slate: colors.slate,
      zinc: colors.zinc,
      sky: colors.sky,
      yellow: colors.yellow,
      red: colors.red,
      blue: {
        '50': '#e0efff',
        '100': '#a8dcff',
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
		/*
    fontFamily: {
      'sans': ['Public Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'Noto Sans', 'Segoe UI', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'serif': ['ui-serif', 'Georgia', 'Cambria', 'Times', 'Times New Roman', 'serif'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
		*/
  },
  variants: {
    logical: [
      'responsive',
      'hover'
    ],
  },
  plugins: [], // if we add forms, do it here
}
