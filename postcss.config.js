let hugoTheme = 'twjit-thoreau' // choices are twjit-hero and twjit-thoreau

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [`themes/${hugoTheme}/assets/css`]
    }),
    require('tailwindcss/nesting'),
    require("autoprefixer"),
  ]
}
