#!/bin/sh
set -eu

ZIP_NAME="${1:-life-quest-v3-beta2-deploy.zip}"
TMP_DIR="/tmp/life-quest-deploy"

if [ ! -f "$ZIP_NAME" ]; then
  echo "ERROR: $ZIP_NAME was not found in the current directory."
  exit 1
fi

git pull --rebase origin main

rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
unzip -q "$ZIP_NAME" -d "$TMP_DIR"

for required in index.html version.json manifest.webmanifest service-worker.js .nojekyll; do
  if [ ! -e "$TMP_DIR/$required" ]; then
    echo "ERROR: $required is missing from the deploy ZIP."
    rm -rf "$TMP_DIR"
    exit 1
  fi
done

find . -mindepth 1 -maxdepth 1 \
  ! -name '.git' \
  ! -name "$ZIP_NAME" \
  -exec rm -rf {} +

cp -a "$TMP_DIR"/. .
rm -rf "$TMP_DIR"
rm -f "$ZIP_NAME"

if command -v node >/dev/null 2>&1; then
  node --check service-worker.js
fi

git add -A

if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "Deploy Questline v3.0.0-beta.2"
fi

git push origin main

echo "Deployment pushed."
echo "GitHub Pages: https://jmhm-intuit.github.io/life-quest/"
