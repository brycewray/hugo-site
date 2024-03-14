#!/bin/sh
# --- for use with macOS and Linux/WSL

HUGO_VERSION=0.123.8
HUGO_OS_ARCH='darwin-universal'
# ^^^ choices for 'HUGO_OS_ARCH' (Extended Version only):
# - 'darwin-universal' (macOS Universal Binary, Hugo 0.102.0 and up)
# - 'linux-amd64' (Linux/WSL on x86-64)
# - 'linux-arm64' (Linux/WSL on ARM-64)

DARTSASS_VERSION=1.72.0
DARTSASS_OS_ARCH='macos-arm64'
# ^^^ choices for "DARTSASS_OS_ARCH":
# - 'linux-arm64' (Linux/WSL on ARM-64)
# - 'linux-x64' (Linux/WSL on x86-64)
# - 'macos-arm64' (macOS on Apple Silicon)
# - 'macos-x64' (macOS on Intel)

echo "Checking requested versions...\n"

if grep -q "hugo v${HUGO_VERSION}" <<< $(hugo env)
then
  echo "Detected Hugo v.${HUGO_VERSION}!\n"
else
  echo "Failed to detect Hugo v.${HUGO_VERSION} --- installing it...\n"
  wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_${HUGO_OS_ARCH}.tar.gz -O hugo_extended_${HUGO_VERSION}_${HUGO_OS_ARCH}.tar.gz
  tar -xvf hugo_extended_${HUGO_VERSION}_${HUGO_OS_ARCH}.tar.gz hugo
  rm -rf ../bin/hugo
  mv hugo ../bin
  if [ ${HUGO_OS_ARCH} == 'darwin-universal' ]
  then
    xattr -dr com.apple.quarantine ../bin/hugo # "bless" the Hugo binary in macOS
  fi
  hugo version
  rm -rf hugo_extended_${HUGO_VERSION}_${HUGO_OS_ARCH}.tar.gz
fi

if grep -q "github.com/sass/dart-sass/compiler=\"${DARTSASS_VERSION}" <<< $(hugo env)
then
  echo "Detected Dart Sass v.${DARTSASS_VERSION}!\n"
else
  echo "Failed to detect Dart Sass v.${DARTSASS_VERSION} --- installing it...\n"
  curl -LJO https://github.com/sass/dart-sass/releases/download/${DARTSASS_VERSION}/dart-sass-${DARTSASS_VERSION}-${DARTSASS_OS_ARCH}.tar.gz
  tar -xvf dart-sass-${DARTSASS_VERSION}-${DARTSASS_OS_ARCH}.tar.gz
  rm -rf ../bin/dart-sass
  mv dart-sass ../bin
  sass --embedded --version
  rm -rf dart-sass-${DARTSASS_VERSION}-${DARTSASS_OS_ARCH}.tar.gz
fi

hugo env
