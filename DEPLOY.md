# Deploy Questline 3.5 to life-quest

Repository: `https://github.com/jmhm-intuit/life-quest`

Public app: `https://jmhm-intuit.github.io/life-quest/`

Upload `life-quest-v3.5-deploy.zip` to the root of the cloned repository, then run:

```bash
cd life-quest
git pull --rebase origin main
unzip -p life-quest-v3.5-deploy.zip deploy.sh > /tmp/deploy-life-quest-v3.5.sh
chmod +x /tmp/deploy-life-quest-v3.5.sh
/tmp/deploy-life-quest-v3.5.sh life-quest-v3.5-deploy.zip
```

The script validates the archive, preserves `.git`, replaces the deployed files, runs available checks, commits as `Deploy Questline v3.5.0`, and pushes to `main`.
