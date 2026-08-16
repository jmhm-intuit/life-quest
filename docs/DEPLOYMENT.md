# Questline 3.5 Deployment

## Local computer and phone

```bash
python run_local.py
```

Open the localhost address on the computer. Open the local-network address on a phone connected to the same Wi-Fi.

## GitHub Pages

Repository: `jmhm-intuit/life-quest`

1. Push the deploy package contents to `main`.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. The included workflow runs syntax, preflight, and smoke checks and deploys the static site.
4. Open `https://jmhm-intuit.github.io/life-quest/`.

## Updating from a phone terminal

Place the deployment ZIP in the cloned repository and run the deployment script: 

```bash
chmod +x deploy-life-quest-v3.5.sh
./deploy-life-quest-v3.5.sh life-quest-v3.5-deploy.zip
```

The script validates the archive before replacing the current site, preserves `.git`, commits only when needed, and pushes to `main`.
