#!/bin/bash

# based on https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099/7
# - thanks, @bep!

echo "Install Dart Sass Embedded..."

# This should be in the PATH.
BIN_DIR=/opt/buildhome/.binrc/bin

DARTSASS_VERSION=1.50.1

mkdir -p $BIN_DIR

curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DARTSASS_VERSION}/sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

tar -xvf sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

mv sass_embedded/dart-sass-embedded $BIN_DIR

rm -rf sass_embedded*;

dart-sass-embedded --version

echo "Building..."

hugo --gc
