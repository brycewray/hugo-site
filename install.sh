#!/bin/sh
HUGO_VERSION=0.114.1
DART_SASS_VERSION=1.63.6

echo "Checking requested versions...\n"

if grep -q "hugo v${HUGO_VERSION}" <<< $(hugo env)
then
  echo "Detected Hugo v.${HUGO_VERSION}!\n"
else
  echo "Didn’t detect Hugo v.${HUGO_VERSION} -- installing it...\n"
  wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz -O hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz
  tar -xvf hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz hugo
  rm -rf ../bin/hugo
  mv hugo ../bin
  xattr -dr com.apple.quarantine ../bin/hugo
  hugo version
  rm -rf hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz
fi

if grep -q "github.com/sass/dart-sass/compiler=\"${DART_SASS_VERSION}" <<< $(hugo env)
then
  echo "Detected Dart Sass v.${DART_SASS_VERSION}!\n"
else
  echo "Didn’t detect Dart Sass v.${DART_SASS_VERSION} -- installing it...\n"
  curl -LJO https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
  tar -xvf dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
  rm -rf ../bin/dart-sass
  mv dart-sass ../bin
  sass --embedded --version
  rm -rf dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
fi

hugo env
