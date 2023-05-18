#!/bin/bash

rm -rf public

rm -rf static/_pagefind

hugo --minify --gc

mv public/posts/index.xml public/index-excerpts.xml

mv public/posts/index.json public/index-excerpts.json

npm_config_yes=true npx pagefind@latest --source public --bundle-dir ../static/_pagefind
