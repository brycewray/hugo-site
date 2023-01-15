const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: "jit",
  content: [
    "./content/**/*.md",
    "./themes/twcss/layouts/**/*.html"
  ],
  darkMode: 'media',
  theme: {
		fluidTypography: {},
		extend: {
			flex: {
				'100': '0 0 100px',
				'200': '0 0 200px',
			},
			screens: {
				'ml': '960px',
				'3xl': '1920px',
			},
			fontWeight: {
				'darknormal': 375,
				'darksemibold': 575,
				'darkbold': 675,
			},
			fontSize: {
				'fn': '.65rem',
			},
			fontFamily: {
				'sans': ['Libre Franklin', ...defaultTheme.fontFamily.sans],
			},
		},
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
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
		require('tailwind-fluid-typography')
  ], // if we add forms, do it here
}
