# Deploy Questline 3.9

Place `life-quest-v3.9-deploy.zip` in the root of the cloned `life-quest` repository and run:

```bash
cd life-quest

git pull --rebase origin main

unzip -p life-quest-v3.9-deploy.zip deploy.sh \
  > /tmp/deploy-life-quest-v3.9.sh

chmod +x /tmp/deploy-life-quest-v3.9.sh

/tmp/deploy-life-quest-v3.9.sh \
  life-quest-v3.9-deploy.zip
```

The script validates the archive, preserves `.git`, replaces the static site, runs available checks, commits `Deploy Questline v3.9.0`, and pushes `main`.

Public URL: https://jmhm-intuit.github.io/life-quest/
