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
    "./themes/twcss-prose/layouts/**/*.html"
  ],
	safelist: [
		'header-anchor',
	],
  theme: {
		fluidTypography: {},
		extend: {
			colors: {
				blue: {
					50: '#f0f7ff',
					100: '#dbedff',
					150: '#cce6ff',
					200: '#b8dbff',
					300: '#91c7fd',
					400: '#5dabf9',
					500: '#007af5',
					600: '#0066cc',
					700: '#0073e6',
					750: '#005ebd',
					800: '#00478f',
					850: '#004285',
					900: '#003d7a',
					950: '#002952'
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
		require('@tailwindcss/typography'),
  ], // if we add forms, do it here
}
