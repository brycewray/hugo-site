module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['themes/ofotipostcss/assets/css']
    }),
    require('postcss-preset-env')({ stage: 1 }),
    require('postcss-clean'),
  ],
}