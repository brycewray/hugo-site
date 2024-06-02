#!/bin/bash
MY_IP=$(<myip.txt)
npm_config_yes=true npx serve public -l tcp://${MY_IP}
npm run testbuild
