# Returnwise Order Return Assessment

A JavaScript React dashboard for estimating order return likelihood. The frontend collects order and customer details and sends them to the separately hosted FastAPI service; no model or backend is stored in this repository.

## Tech Stack

- React 19 and JavaScript
- Vite 8
- Hugging Face Spaces-hosted FastAPI prediction API
- GitHub Actions for CI and Vercel for hosting

## Local Development

Install dependencies, configure the API URL, and start Vite:

```sh
npm install
cp .env.example .env
npm run dev
```

Run the project checks and production build with:

```sh
npm run lint
npm run build
```

Vite writes production assets to `dist/`. The generated directory is ignored by Git.

## Environment Variables

The frontend reads `VITE_API_URL` at build time. `.env.example` contains the public backend URL; copy it to `.env` for local development. Real `.env` files are ignored by Git.

Vite exposes variables prefixed with `VITE_` in browser code. Never put API keys, passwords, tokens, or other secrets in these variables. The prediction API currently requires no frontend API key.

## CI And Deployment

GitHub Actions runs on pushes to `main` and pull requests targeting `main`. It uses Node.js 24, installs the lockfile dependencies with `npm ci`, then runs lint and the production build. A failing check fails the workflow.

Connect the GitHub repository to Vercel and use `main` as the production branch. Vercel's Git integration automatically deploys pushes to `main`; to ensure only validated changes reach production, protect `main` and require the `validate` status check before merges. GitHub Actions only validates and does not duplicate deployment. Vercel handles pull request preview deployments.

In Vercel Project Settings, add this environment variable for **Production** (and Preview if desired), then redeploy so Vite can include it in the build:

```text
VITE_API_URL=https://agus-dev-order-return.hf.space
```

`vercel.json` configures the Vite framework, `npm ci` install command, `npm run build` build command, and `dist` output directory. This app does not use React Router, so it does not need an SPA route rewrite.

## Backend API

The independent backend is hosted at `https://agus-dev-order-return.hf.space`:

- `GET /health` checks service health.
- `POST /predict` accepts JSON with `item_price` (number), `item_size` (string), `item_color` (string), `brand_id` (integer), `user_title` (string), `user_state` (string), `order_date` (date), and `user_reg_date` (date). `user_dob` and `delivery_date` are optional nullable dates.
- The response includes return probability, no-return probability, prediction, and label.

The deployment architecture is:

```text
React Frontend
			↓
		Vercel
			↓
Hugging Face FastAPI
			↓
	PyTorch Model
```
