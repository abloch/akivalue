#!/usr/bin/env bash
set -euo pipefail

docker build -t akivalue .
docker run --rm -p 8080:8080 -v "$(pwd):/app" -v /app/node_modules akivalue
