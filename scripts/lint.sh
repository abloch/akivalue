#!/usr/bin/env bash
set -euo pipefail

npx @11ty/eleventy
npx htmlhint "_site/**/*.html"
