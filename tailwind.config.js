module.exports = {
  purge: {
    content: [
      './layouts/**/*.html',
    ],
  },
  theme: {
    screens: {
      'sm': '640px',  // => @media (min-width: 640px) { ... }
      'md': '768px',  // => @media (min-width: 768px) { ... }
      'lg': '1024px', // => @media (min-width: 1024px) { ... }
      'xl': '1280px', // => @media (min-width: 1280px) { ... }
    },
    extend: {
      screens: {
        'dark': {
          'raw': '(prefers-color-scheme: dark)',
        },
      },
      colors: {
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
    },
  },
  variants: {},
  plugins: [],
}
