#!/bin/bash

# # Always run with `bash cfp-build.sh` on CFP!

echo "-----------------------"

echo "Beginning shell script."

echo "-----------------------"

echo "Cleaning 'public' and 'pagefind' dirs, just to be safe..."

rm -rf public

rm -rf static/_pagefind

echo "Running Hugo..."

hugo --minify --gc

echo "Moving excerpted feed files..."

mv public/posts/index.xml public/index-excerpts.xml

mv public/posts/index.json public/index-excerpts.json

echo "Running search..."

npm_config_yes=true npx pagefind@latest --source public

echo "-----------------------"

echo "Shell script complete!"

echo "-----------------------"
