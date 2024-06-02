#!/bin/bash
sh ./push.sh # keep this with **both** Hugo-only **and** Hugo-with-npm
sh ./build.sh
sh ./deploy.sh # <-- this file purposely not public (CFP data)
# npm run deploy
