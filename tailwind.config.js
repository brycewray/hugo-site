module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      './themes/ofotitwcss/layouts/**/*.html',
    ],
  },
  theme: {
    backgroundImage: {
      'gradient-to-t': 'linear-gradient(to top, var(--gradient-color-stops))',
      'gradient-to-tr': 'linear-gradient(to top right, var(--gradient-color-stops))',
      'gradient-to-r': 'linear-gradient(to right, var(--gradient-color-stops))',
      'gradient-to-br': 'linear-gradient(to bottom right, var(--gradient-color-stops))',
      'gradient-to-b': 'linear-gradient(to bottom, var(--gradient-color-stops))',
      'gradient-to-bl': 'linear-gradient(to bottom left, var(--gradient-color-stops))',
      'gradient-to-l': 'linear-gradient(to left, var(--gradient-color-stops))',
      'gradient-to-tl': 'linear-gradient(to top left, var(--gradient-color-stops))',
    },
    gradientColorStops: (theme) => theme('colors'),
    screens: {
      'sm': '640px',  // => @media (min-width: 640px) { ... }
      'md': '768px',  // => @media (min-width: 768px) { ... }
      'lg': '1024px', // => @media (min-width: 1024px) { ... }
      'xl': '1280px', // => @media (min-width: 1280px) { ... }
      'xb': '1920px', // => @media (min-width: 1920px) { ... }
    },
    extend: {
      screens: {
        'dark': {
          'raw': '(prefers-color-scheme: dark)',
        },
      },
      fontSize: { // these will cease to be relevant with TWCSS 2.0, which will add 7xl, 8xl, **and** 9xl
        '7xl': '4.5rem',
        '8xl': '5rem',
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
