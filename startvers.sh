#!/bin/sh
echo "Checking requested versions..."
HUGO_VERSION=0.114.1
DART_SASS_VERSION=1.63.6
VCHECK=$(hugo env)
echo "\n-----\n"
if grep -c "hugo v${HUGO_VERSION}" <<< ${VCHECK}
then
  echo "Detected Hugo v.${HUGO_VERSION}!"
else
  echo "Didn’t detect Hugo v.${HUGO_VERSION} -- installing it..."
  echo " ----- "
  wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz -O hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz
  tar -xvf hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz hugo
  # rm -rf ../bin/hugo # just in case
  mv hugo ../bin
  xattr -dr com.apple.quarantine ../bin/hugo
  rm -rf hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz
  hugo version
fi
echo "\n-----\n"
if grep -c "github.com/sass/dart-sass/compiler=\"${DART_SASS_VERSION}" <<< ${VCHECK}
then
  echo "Detected Dart Sass v.${DART_SASS_VERSION}!"
else
  echo "Didn’t detect Dart Sass v.${DART_SASS_VERSION} -- installing it..."
  echo " ----- "
  curl -LJO https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
  tar -xvf dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
  rm -rf ../bin/dart-sass # just in case
  mv dart-sass ../bin
  sass --embedded --version
  rm -rf dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
fi
echo "\n-----\n"
hugo env
echo "\n-----\n"
# now hand off to regular start script
./start.sh
