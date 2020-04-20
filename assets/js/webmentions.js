// Based on:
// https://github.com/PaulKinlan/paul.kinlan.me/blob/main/build.sh
// https://github.com/PaulKinlan/paul.kinlan.me/blob/main/process-mentions.js
// ... as described in https://paul.kinlan.me/using-web-mentions-in-a-static-sitehugo/
// ... and also:
// https://github.com/maxboeck/eleventy-webmentions
// https://sia.codes/posts/webmentions-eleventy-in-depth/

"use strict";

const fs = require('fs')
const fetch = require('node-fetch')
const md5 = require('md5')

// Load .env vars with dotenv
require('dotenv').config()

const API_ORIGIN = 'https://webmention.io/api/mentions.jf2'
const addlStats = '?per-page=1000&domain='
const domainToPoll = 'brycewray.com'
const leadToToken = '&token='
const TOKEN = process.env.WEBMENTION_IO_TOKEN
const urlToPoll = API_ORIGIN + addlStats + domainToPoll + leadToToken + TOKEN

const processMentionsJson = (data) => {
  const urlData = {}
  data.children.forEach(item => {
    const wmProperty = item["wm-property"]
    const url = item[wmProperty]

    if(url in urlData === false) urlData[url] = {}
    const urlDataItem = urlData[url]

    if(wmProperty in urlDataItem === false) urlDataItem[wmProperty] = []
    urlDataItem[wmProperty].push(item)
  });

  console.log(urlData)

  // For each URL in the blog we now have a JSON stucture that has all the like, mentions and reposts
  if(fs.existsSync('./data') === false) fs.mkdirSync('./data')
  Object.keys(urlData).forEach(key => {
    const item = urlData[key]
    const md5url = md5(key)
    console.log(key, md5url)
    fs.writeFileSync(`./data/${md5url}.json`, JSON.stringify(item))
  })
}

(async () => {
  // const mentionsUrl = new URL(process.argv[2]) // Fail hard if it's not a uRL
  const mentionsUrl = urlToPoll // Fail hard if it's not a uRL
  const mentionsResponse = await fetch(mentionsUrl)
  const mentionsJson = await mentionsResponse.json()

  processMentionsJson(mentionsJson)
})()