#!/usr/bin/env sh
set -eu

ZIP_FILE=${1:-life-quest-v3.3-deploy.zip}
TMP_DIR="/tmp/life-quest-v3.3-$$"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT INT TERM

if [ ! -d .git ]; then
  echo "ERROR: run this script from the root of the cloned life-quest repository."
  exit 1
fi

if [ ! -f "$ZIP_FILE" ]; then
  echo "ERROR: deployment archive not found: $ZIP_FILE"
  exit 1
fi

git pull --rebase origin main

mkdir -p "$TMP_DIR"
unzip -q "$ZIP_FILE" -d "$TMP_DIR"

for required in index.html app.js app.css version.json .github/workflows/pages.yml; do
  if [ ! -f "$TMP_DIR/$required" ]; then
    echo "ERROR: deployment archive is missing $required"
    exit 1
  fi
done

if command -v node >/dev/null 2>&1; then
  (cd "$TMP_DIR" && node --check app.js)
  (cd "$TMP_DIR" && node scripts/preflight.mjs)
  (cd "$TMP_DIR" && node scripts/smoke.mjs)
else
  echo "Node is unavailable; local JavaScript checks skipped. GitHub Actions will run them."
fi

find . -mindepth 1 -maxdepth 1 \
  ! -name '.git' \
  ! -name "$ZIP_FILE" \
  -exec rm -rf {} +

cp -a "$TMP_DIR"/. .
rm -f "$ZIP_FILE"

if command -v node >/dev/null 2>&1; then
  node --check app.js
  node scripts/preflight.mjs
  node scripts/smoke.mjs
fi

git add -A

if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "Deploy Questline v3.3.0"
fi

git push origin main

echo "Deployment pushed. GitHub Actions will publish:"
echo "https://jmhm-intuit.github.io/life-quest/"
