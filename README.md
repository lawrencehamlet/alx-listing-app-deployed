# ALX Listing App

ALX Listing App is a property listing platform inspired by Airbnb, built with Next.js, TypeScript, TailwindCSS, and ESLint. The goal is to provide a clean, responsive, and scalable foundation for building a modern property listing or rental application.

## Project Structure

- **components/**: Contains all reusable React components.
  - **common/**: Shared UI components like `Card` and `Button`.
- **interfaces/**: TypeScript interfaces for props and data models (e.g., `CardProps`, `ButtonProps`).
- **constants/**: Centralized constants such as API URLs, configuration, and UI text.
- **public/assets/**: Static assets (images, SVGs, etc.) used throughout the app.
- **pages/**: Next.js Pages Router for routing and API endpoints.

## Getting Started

1. **Install dependencies:**
	```bash
	npm install
	```
2. **Run the development server:**
	```bash
	npm run dev
	```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Goals

- Build a scalable, maintainable Airbnb-style listing page.
- Enforce type safety and code quality with TypeScript and ESLint.
- Use TailwindCSS for rapid, responsive UI development.

---

## Deploying to Vercel

Follow these steps to deploy the app to Vercel (recommended for Next.js apps):

1. Sign in to Vercel
	- Go to https://vercel.com and sign in with your GitHub account.

2. Create a new project
	- Click "New Project" and import the repository `lawrencehamlet/alx-listing-app-04`.
	- Vercel will detect Next.js and apply sensible defaults.

3. Environment Variables
	- In the project settings on Vercel, add the following Environment Variables:
	  - `NEXT_PUBLIC_API_BASE_URL` — your API base URL (for example: `https://api.example.com`)
	- Add the variables to the **Production** environment (and Preview/Development if needed).

4. Build & Output Settings
	- The defaults are usually fine for a Next.js project.
	- Build command: `npm run build`
	- Output directory: (leave default — Next.js handles this)

5. Deploy
	- Click "Deploy". Vercel will build and deploy your app.
	- After deployment completes, you will get a public URL (e.g., `https://your-project.vercel.app`).

6. Post-deploy checks
	- Visit the deployed URL and verify the pages:
	  - `/` — Home listings
	  - `/property/1` — Property detail
	  - `/booking` — Booking page
	- If the app needs to call an external API, ensure `NEXT_PUBLIC_API_BASE_URL` points to the production API.

Notes and tips
- Keep secrets out of your repo: use Vercel Environment Variables rather than committing `.env.local`.
- If you need server-only secrets (not exposed to the browser), use regular environment variables without `NEXT_PUBLIC_` prefix and access them in server code only.
- To run the same production build locally for testing, use:
  ```bash
  npm run build
  npm run start
  ```

Troubleshooting
- If images from external hosts (e.g., `picsum.photos` or `i.pravatar.cc`) do not load, add the hostnames to the `images.domains` array in `next.config.js` and redeploy.
- If Vercel build fails, check the build logs in the Vercel dashboard for specific errors.

 
