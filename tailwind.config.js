// const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */

module.exports = {
	// prefix: 'tw-',
	darkMode: 'class',
  // darkMode: 'media',
  mode: "jit",
  content: [
		"./hugo_stats.json",
    "./content/**/*.md",
    "./themes/layouts/**/*.html",
		"./assets/js/*.js"
  ],
	safelist: [
		'header-anchor',
	],
  theme: {
		// fluidTypography: {},
		fontSize: {
			// https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
			// for each item below, comment shows TWCSS default values for `font-size` and `line-height`
			xs: ['clamp(0.7rem, 0.65rem + 0.125vw, 0.8rem)', '1rem'], // 0.75rem - 1rem
			sm: ['clamp(0.8rem, 0.75rem + 0.125vw, 0.9rem)', '1.25rem'], // 0.875rem - 1.25rem
			base: ['font-size: clamp(0.9rem, 0.8rem + 0.25vw, 1.1rem)', '1.25'], // 1rem - 1.5rem
			lg: ['clamp(1.125rem, 1.0625rem + 0.1563vw, 1.25rem);', '1.5'], // 1.125rem - 1.75rem
			xl: ['clamp(1.125rem, 0.9375rem + 0.4688vw, 1.5rem)', '1.75rem'], // 1.25rem - 1.75rem
			'2xl': ['clamp(1.25rem, 1.0625rem + 0.4688vw, 1.625rem)', '2rem'], // 1.5rem - 2rem
			'3xl': ['clamp(1.5rem, 1.25rem + 0.625vw, 2rem)', '2.25rem'], // 1.875rem - 2.25rem
			'4xl': ['clamp(1.875rem, 1.5625rem + 0.7813vw, 2.5rem)', '2.5rem'], // 2.25rem - 2.5rem
			'5xl': ['clamp(2.5rem, 2.1250rem + 0.9375vw, 3.25rem)', '1'], // 3rem - 1
			'6xl': ['clamp(2.5rem, 1.5rem + 2.5vw, 4.5rem)', '1'], // 3.75rem - 1
			'7xl': ['clamp(3rem, 1.5rem + 3.75vw, 6rem)', '1'], // 4.5rem - 1
			'8xl': ['clamp(4rem, 2.75rem + 3.125vw, 6.5rem)', '1'], // 6rem - 1
			'9xl': ['clamp(5rem, 4.rem + 2.5vw, 7rem)', '1'], // 8rem - 1
		},
		extend: {
			fontSize: {
				'fn': ['clamp(0.65rem, 0.5375rem + 0.2813vw, 0.875rem)', '1rem'],
			},
			fontFamily: {
				'sans': ['Libre Franklin', ...defaultTheme.fontFamily.sans],
				'social-sans-serif': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
				'emojis': ['Apple Color Emoji',
				'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
			},
			colors: {
				slate: {
					50: '#f8fafc',
					100: '#f1f5f9',
					150: '#eaeff5',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					750: '#293548',
					800: '#1e293b',
					850: '#172033',
					900: '#0f172a',
					950: '#020617'
				},
				gray: {
					50: '#f9fafb',
					100: '#f3f4f6',
					200: '#e5e7eb',
					300: '#d1d5db',
					350: '#b7bcc5',
					400: '#9ca3af',
					450: '#848b98',
					500: '#6b7280',
					550: '#5b6472',
					600: '#4b5563',
					650: '#414b5a',
					700: '#374151',
					750: '#2b3544',
					800: '#1f2937',
					850: '#18212f',
					900: '#111827',
					950: '#030712'
				},
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
			screens: {
				'ml': '960px',
				'3xl': '1920px',
			},
			// fontWeight: {
			// 	'darknormal': 375,
			// 	'darksemibold': 575,
			// 	'darkbold': 675,
			// },
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
    // logical: [
    //   'responsive',
    //   'hover'
    // ],
  },
  plugins: [
    // require('tailwindcss-logical'),
		// require('tailwind-fluid-typography')
		// require('tailwindcss-fluid-type')({
		// 	settings: {
		// 		fontSizeMin: 0.9, // default = 1.125rem (18px)
		// 		// fontSizeMax: 1.35, // default = 1.25rem (20px)
		// 		ratioMin: 1.15,
		// 		ratioMax: 1.25,
		// 	},
		// 	values: {
		// 		'fn': [-2.5, 1.5],
		// 		'xs': [-2, 1.5],
		// 		'sm': [-1.25, 1.5],
		// 		'base': [0, 1.5],
		// 		'lg': [1, 1.45],
		// 		'xl': [1.75, 1.4],
		// 		'2xl': [2.5, 1.3],
		// 		'3xl': [3.75, 1.25],
		// 		'4xl': [4.5, 1.2],
		// 		'5xl': [5.25, 1.2],
		// 		'6xl': [6, 1.1],
		// 		'7xl': [7, 1.1],
		// 		'8xl': [8, 1],
		// 		'9xl': [9, 1],
		// 	},
		// })
  ], // if we add forms, do it here
}
