#!/bin/sh
# rm -rf public
# rm -rf static/pagefind && rm -rf static/_pagefind # kill prev PF index, if any
# hugo --gc --minify --logLevel info
# mv public/posts/index.xml public/index-excerpts.xml
# mv public/posts/index.json public/index-excerpts.json
# npm_config_yes=true npx pagefind@latest --site public
npm run build
