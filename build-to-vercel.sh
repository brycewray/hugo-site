#!/bin/bash

echo "Install Dart Sass Embedded..."

# This is in Vercel's PATH.
BIN_DIR=${pwd}/bin
DARTSASS_VERSION=1.49.9

echo "pwd output is:"
pwd

mkdir -p $BIN_DIR

curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DARTSASS_VERSION}/sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

tar -xvf sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

mv sass_embedded/dart-sass-embedded $BIN_DIR

rm -rf sass_embedded*;

# echo "List Bin Dir..."
# ls $BIN_DIR;

dart-sass-embedded --version

echo "Building..."

hugo