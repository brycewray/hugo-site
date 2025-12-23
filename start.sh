#!/bin/sh
MY_IP=$(<myip.txt)
MY_PATH=$(<mypath.txt)
HUGO_VERSION=$(<.hvm)
rm -rf public
rm -rf static/pagefind && rm -rf static/_pagefind
${MY_PATH}/hvm/${HUGO_VERSION}/hugo server --port 3000 --bind=0.0.0.0 --baseURL=http://${MY_IP}:3000 --panicOnWarning --forceSyncStatic --gc
# npm run start
