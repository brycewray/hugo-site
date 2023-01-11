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
			// colors: {
			// 	blue: {
			// 		'50': '#e0efff',
			// 		'100': '#a8dcff',
			// 		'200': '#00aaff',
			// 		'300': '#0088ff',
			// 		'400': '#0033ff',
			// 		'500': '#0000ff',
			// 		'600': '#0000bb',
			// 		'700': '#0000aa',
			// 		'800': '#000088',
			// 		'900': '#000066',
			// 	},
			// },
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
