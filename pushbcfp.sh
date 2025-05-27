#!/bin/bash
sh ./push.sh # keep this with **both** Hugo-only **and** Hugo-with-npm
sh ./build.sh
sh ./deploy-workers.sh # <-- since 2025-05-27 (https://discourse.gohugo.io/t/hugo-support-in-cloudflare-workers/54866)
# npm run deploy
