# Deploy Questline 3.6

Repository: `jmhm-intuit/life-quest`

After placing `life-quest-v3.6-deploy.zip` in the cloned repository root, run:

```bash
cd life-quest

git pull --rebase origin main

unzip -p life-quest-v3.6-deploy.zip deploy.sh \
  > /tmp/deploy-life-quest-v3.6.sh

chmod +x /tmp/deploy-life-quest-v3.6.sh

/tmp/deploy-life-quest-v3.6.sh \
  life-quest-v3.6-deploy.zip
```

GitHub Actions will publish:

`https://jmhm-intuit.github.io/life-quest/`
