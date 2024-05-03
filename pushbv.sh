#!/bin/sh
sh ./push.sh
# no need for ./build.sh with Vercel build process
sh ./deploy.sh # <-- this file purposely not public (private data)
# npm run deploy
