module.exports = {
  plugins: [
    require("autoprefixer")({
      browsers: [
        "last 4 versions",
        "> 1%",
        "maintained node versions"
      ]
    })
  ]
}
