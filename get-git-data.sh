#!/bin/bash
# **MUST** be run **before** Hugo builds if possible
# rm -rf data/gitoutput.yml # avoid appending to existing
printf "gitinfo:\n" >> data/gitoutput.yml
cd content
git ls-tree -r --name-only HEAD | while read filename; do
  printf "\055 FilePath: $filename\n$(git log -1 --all --pretty=format:"  Hash: %H\n  AbbreviatedHash: %h\n  LastmodDate: %cI" -- $filename)\n" >> ../data/gitoutput.yml
done
