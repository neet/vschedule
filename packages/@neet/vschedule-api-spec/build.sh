#!/usr/bin/env bash
rm -rf ./dist
yarn run tsc
yarn run mkdirp ./dist
node ./dist/api.js >./dist/api.json
rm ./dist/api.js ./dist/api.d.ts
