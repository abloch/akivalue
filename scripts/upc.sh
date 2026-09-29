#!/usr/bin/env bash
set -euo pipefail

npm install
rm -rf _site
npx @11ty/eleventy --serve
