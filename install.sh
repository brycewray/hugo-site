#!/bin/sh
# --- for use with macOS and Linux/WSL

HVM_VERSION=0.11.0
# https://github.com/jmooring/hvm/releases/
HVM_OS_ARCH='darwin-arm64'
# ^^^ choices for 'HVM_OS_ARCH':
# - 'darwin-amd64' (macOS on Intel)
# - 'darwin-arm64' (macOS on Apple Silicon)
# - 'linux-amd64' (Linux/WSL on x86-64)
# - 'linux-arm64' (Linux/WSL on ARM-64)

DARTSASS_VERSION=1.97.3
# https://github.com/sass/dart-sass/releases/
DARTSASS_OS_ARCH='macos-arm64'
# ^^^ choices for "DARTSASS_OS_ARCH":
# - 'linux-arm64' (Linux/WSL on ARM-64)
# - 'linux-x64' (Linux/WSL on x86-64)
# - 'macos-arm64' (macOS on Apple Silicon)
# - 'macos-x64' (macOS on Intel)

echo "Checking requested versions...\n"

if grep -q "hvm ${HVM_VERSION}" <<< $(hvm version)
then
  echo "Detected hvm v.${HVM_VERSION}!\n"
else
  echo "Failed to detect hvm v.${HVM_VERSION} --- installing it...\n"
  wget https://github.com/jmooring/hvm/releases/download/v${HVM_VERSION}/hvm-${HVM_OS_ARCH}.tar.gz -O hvm-${HVM_OS_ARCH}.tar.gz
  tar -xvf hvm-${HVM_OS_ARCH}.tar.gz hvm # get only hvm from the .tar.gz
  rm -rf ../bin/hvm
  mv hvm ../bin
  if [ ${HVM_OS_ARCH} == 'darwin-arm64' ]
  then
    xattr -dr com.apple.quarantine ../bin/hvm # "bless" the hvm binary in macOS
  fi
  hvm version
  rm -rf hvm-${HVM_OS_ARCH}.tar.gz
fi

if grep -q "compilerVersion\": \"${DARTSASS_VERSION}" <<< $(sass --embedded --version)
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
