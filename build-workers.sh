#!/usr/bin/env bash

#------------------------------------------------------------------------------
# From:
# https://github.com/jmooring/hosting-cloudflare-worker/blob/main/build.sh
# ...as of 2025-05-27
#------------------------------------------------------------------------------
# @file
# Builds a Hugo site hosted on a Cloudflare Worker.
#
# The Cloudflare Worker build image already includes Go, Hugo (an old version),
# and Node js. Set the desired Dart Sass and Hugo versions below.
#
# The Cloudflare Worker automatically installs Node.js dependencies.
#------------------------------------------------------------------------------

main() {

  DART_SASS_VERSION=1.89.0
  HUGO_VERSION=0.147.6

  # Install Dart Sass
  echo "Installing Dart Sass v${DART_SASS_VERSION}..."
  curl -LJO "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
  tar -xf "dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
  cp -r dart-sass/ /opt/buildhome
  rm -rf dart-sass*

  # Install Hugo
  echo "Installing Hugo v${HUGO_VERSION}..."
  curl -LJO https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz
  tar -xf "hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
  cp hugo /opt/buildhome
  rm LICENSE README.md hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz

  # Set PATH
  echo "Setting the PATH environment variable..."
  export PATH=/opt/buildhome:/opt/buildhome/dart-sass:$PATH

  # Verify installed versions
  echo "Verifying installations..."
  echo Dart Sass: "$(sass --version)"
  echo Go: "$(go version)"
  echo Hugo: "$(hugo version)"
  echo Node.js: "$(node --version)"

  # https://gohugo.io/methods/page/gitinfo/#hosting-considerations
  # git fetch --recurse-submodules --unshallow

  # https://github.com/gohugoio/hugo/issues/9810
  git config core.quotepath false

  # Build the site.
  # hugo --gc --minify
  echo "Building the site with Hugo..."
  hugo --gc --minify --logLevel info

  # RSS feed adjustments
  mv public/posts/index.xml public/index-excerpts.xml
  mv public/posts/index.json public/index-excerpts.json

  # Pagefind
  echo "Building Pagefind index..."
  npm_config_yes=true npx pagefind@latest --site public

}

set -euo pipefail
main "$@"
