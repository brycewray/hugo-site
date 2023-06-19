#!/bin/bash
# # Always run with `bash cfp-build.sh` on CFP!
# # Non-Node build command:
# #   git fetch --unshallow && bash cfp-build.sh
# #
# #   >>> Node build command (i.e., NOT using this script):
# #   >>>  git fetch --unshallow && npm run build

echo "                       "
echo "***********************"
echo "Beginning shell script."
echo "***********************"
echo "                       "
echo "-----------------------"
echo "Cleaning 'public' and 'pagefind' dirs, just to be safe..."
rm -rf public
rm -rf static/_pagefind
echo "                       "
echo "-----------------------"
echo "Setting environment variables..."
# * * * * * *
# Commenting out tool-related vars because, according to
# @JohnDotAwesome on the CF Discord,
# "Tool detection happens prior to the build command,
# so that won't work."
# Must still specify these in the GUI.
#
# HUGO_VERSION=0.113.0
# NODE_VERSION=18.16.0
# EMBEDDED_DART_SASS_VERSION=1.62.1
# * * * * * *
TZ='America/Chicago'
# export HUGO_VERSION
# export NODE_VERSION
# export EMBEDDED_DART_SASS_VERSION
export TZ
echo "                       "
echo "-----------------------"
echo "Running Hugo..."
hugo --minify --gc
echo "                       "
echo "-----------------------"
echo "Moving excerpted feed files..."
mv public/posts/index.xml public/index-excerpts.xml
mv public/posts/index.json public/index-excerpts.json
echo "                       "
echo "-----------------------"
echo "Running search..."
npm_config_yes=true npx pagefind@latest --source public
echo "                       "
echo "***********************"
echo "Shell script complete!"
echo "***********************"
echo "                       "
