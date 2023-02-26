#!/bin/bash
# **MUST** be run **before** Hugo builds if possible
rm -rf data/gitoutput.yml # avoid appending to existing
printf "gitinfo:\n" >> data/gitoutput.yml
cd content
git ls-tree -r --name-only HEAD | while read filename; do
  printf "\055 $filename\n$(git log -1 --pretty=format:"  - %H\n  - %h" -- $filename)\n" >> ../data/gitoutput.yml
done
