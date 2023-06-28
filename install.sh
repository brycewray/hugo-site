#!/bin/sh
HUGO_VERSION=0.114.1
DART_SASS_VERSION=1.63.6
HUGO_ARCH_EXT='darwin-universal.tar.gz'
# ^^^ HUGO_ARCH_EXT choices are... (Hugo Extended Version and 64-bit ONLY)
# - 'darwin-universal.tar.gz' --- Universal binary for macOS, Apple Silicon OR Intel
# - 'windows-amd64.zip' --- Windows on Intel/AMD CPUs (there's no ARM version for Windows)
# - 'Linux-64bit.tar.gz' --- TAR archive, Linux on Intel (and, yes, it's a capital "L")
# - 'linux-amd64.deb' --- Debian archive, Linux on AMD CPUs
# - 'linux-amd64.tar.gz' --- TAR archive, Linux on AMD CPUs
# - 'linux-arm64.deb' --- Debian archive, Linux ARM
# - 'linux-arm64.tar.gz' --- TAR archive, Linux ARM
SASS_ARCH_EXT='macos-x64'
# ^^^ SASS_ARCH_EXT choices are...
# - 'macos-arm64.tar.gz' --- macOS on Apple Silicon CPUs
# - 'macos-x64.tar.gz' --- macOS on Intel CPUs
# - 'windows-ia32.zip' --- Windows x86, 32-bit (no Windows ARM)
# - 'windows-x64.zip' --- Windows x86, 64-bit (no Windows ARM)
# - 'linux-arm.tar.gz' --- Linux ARM, 32-bit
# - 'linux-arm64.tar.gz' --- Linux ARM, 64-bit
# - 'linux-ia32.tar.gz' --- Linux x86, 32-bit
# - 'linux-x64.tar.gz' --- Linux x86, 64-bit

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
