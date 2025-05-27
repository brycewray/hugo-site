#!/bin/bash
sh ./push.sh # keep this with **both** Hugo-only **and** Hugo-with-npm
sh ./build.sh
sh ./deploy-workers.sh # purposely not public
# npm run deploy
