/*
shamelessly stolen from https://github.com/gohugoio/hugoDocs/blob/master/_vendor/github.com/gohugoio/gohugoioTheme/assets/js/codeblocks.js as of 2021-03-18
*/

let article = document.getElementById('postArticle')

if (article) {
  let codeBlocks = article.getElementsByTagName('code')
    for (let [key, codeBlock] of Object.entries(codeBlocks)){
      var widthDif = codeBlock.scrollWidth - codeBlock.clientWidth
      if (widthDif > 0) {
        codeBlock.parentNode.classList.add('expand')
        /*
        console.log(key, " scrollWidth = ", codeBlock.scrollWidth)
        console.log("    clientWidth = ", codeBlock.clientWidth)
        console.log("    offsetWidth = ", codeBlock.offsetWidth)
        console.log("    widthDif    = ", widthDif)
        */
      }
  }
}
