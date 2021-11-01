module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['themes/twjit/assets/css']
    }),
    require('tailwindcss/nesting'),
    require("autoprefixer"),
  ]
}
