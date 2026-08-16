# Questline 3.4 Deployment

## Local computer and phone

```bash
python run_local.py
```

Open the localhost address on the computer. Open the local-network address on a phone connected to the same Wi-Fi.

## GitHub Pages

Repository: `jmhm-intuit/life-quest`

1. Push the deploy package contents to `main`.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. The included workflow runs preflight checks and deploys the static site.
4. Open:

`https://jmhm-intuit.github.io/life-quest/`

## Updating from a phone terminal

Place the deployment ZIP in the cloned repository and run the included deployment script:

```bash
chmod +x deploy.sh
./deploy.sh life-quest-v3.4-deploy.zip
```

The script validates the archive before replacing the current site, commits changes only when necessary, and pushes to `main`.
