// const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: 'class',
  // darkMode: 'media',
	corePlugins: {
		fontSize: false,
	},
  mode: "jit",
  content: [
		"./hugo_stats.json",
    "./content/**/*.md",
    "./themes/twcss/layouts/**/*.html"
  ],
	safelist: [
		'header-anchor',
	],
  theme: {
		fluidTypography: {},
		extend: {
			colors: {
				blue: {
					150: '#cce6ff',
					750: '#005ebd',
					850: '#004285',
				}
			},
			flex: {
				'100': '0 0 100px',
				'200': '0 0 200px',
			},
			// screens: {
			// 	'ml': '960px',
			// 	'3xl': '1920px',
			// },
			// fontWeight: {
			// 	'darknormal': 375,
			// 	'darksemibold': 575,
			// 	'darkbold': 675,
			// },
			fontSize: {
				'fn': '0.65rem',
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
			circle: 'circle'
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
		// require('tailwind-fluid-typography')
		require('tailwindcss-fluid-type')({
			settings: {
				fontSizeMin: 0.9, // default = 1.125rem (18px)
				// fontSizeMax: 1.35, // default = 1.25rem (20px)
				ratioMin: 1.15,
				ratioMax: 1.25,
			},
			values: {
				'fn': [-2.5, 1.5],
				'xs': [-2, 1.5],
				'sm': [-1.25, 1.5],
				'base': [0, 1.5],
				'lg': [1, 1.45],
				'xl': [1.75, 1.4],
				'2xl': [2.5, 1.3],
				'3xl': [3.75, 1.25],
				'4xl': [4.5, 1.2],
				'5xl': [5.25, 1.2],
				'6xl': [6, 1.1],
				'7xl': [7, 1.1],
				'8xl': [8, 1],
				'9xl': [9, 1],
			},
		})
  ], // if we add forms, do it here
}
