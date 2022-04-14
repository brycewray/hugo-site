#!/bin/bash

# based on https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099/7
# - thanks, @bep!

# This is in Vercel's PATH.
BIN_DIR=${pwd}/bin

# first, install Embedded Dart Sass
echo "Install Embedded Dart Sass..."

DARTSASS_VERSION=1.50.0

mkdir -p $BIN_DIR

curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DARTSASS_VERSION}/sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

tar -xvf sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

mv sass_embedded/dart-sass-embedded $BIN_DIR

rm -rf sass_embedded*;

dart-sass-embedded --version

# now install Hugo

echo "Install Hugo extended version..."

HUGO_VERSION=0.97.0

# https://github.com/gohugoio/hugo/releases/download/v0.97.0/hugo_extended_0.97.0_macOS-64bit.tar.gz

curl -LJO https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_macOS-64bit.tar.gz;

tar -xvf hugo_extended_${HUGO_VERSION}_macOS-64bit.tar.gz;

mv hugo_extended-${HUGO_VERSION}_macOS-64bit/hugo $BIN_DIR

rm -rf hugo_extended*;

hugo version

echo "Building site..."

hugo --gc --minify
