# CLAUDE.md - AI Assistant Guide

## Project Overview

Personal portfolio website for Osman Burak Intisah (burakintisah.com). React SPA hosted on GitHub Pages.

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Firebase
**Live site**: https://burakintisah.com
**Deployment**: GitHub Actions on push to `main`

## Quick Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:5173
npm run build        # Production build to /dist
npm run preview      # Preview production build locally
npm run lint         # ESLint check
```

## Project Structure

```
src/
  App.tsx                    # Router config (BrowserRouter with nested routes)
  main.tsx                   # Entry point (StrictMode + BrowserRouter)
  index.css                  # Tailwind directives + custom shimmer animation
  components/
    Layout.tsx               # Shell: header, nav, footer, dark mode, social links
    Button.tsx               # Reusable button
    AnimatedSection.tsx      # Framer Motion entrance animation wrapper
    ScrollToTop.tsx          # Scrolls to top on route change
    AdminAuth.tsx            # Password gate for /analytics
    DataManagement.tsx       # Admin data export/import tools
  pages/
    Home.tsx                 # Landing: hero, featured projects, blog posts
    About.tsx                # Background, education, skills
    Experience.tsx           # Work history timeline
    Projects.tsx             # Project cards with tag filtering
    Blog.tsx                 # Medium blog integration
    Photography.tsx          # Category-based photo gallery
    Bookshelf.tsx            # Book collection with ratings
    ReadingList.tsx          # Currently reading
    Uses.tsx                 # Tools and setup
    Connect.tsx              # Contact and social links
    Analytics.tsx            # Protected admin dashboard
  config/
    firebase.ts              # Firebase app initialization
  services/
    analytics.ts             # Firestore analytics write service
  hooks/
    useAnalytics.ts          # Page view tracking hook (called in App.tsx)
  data/
    photoManifest.ts         # Photo registry by category
  utils/
    photoLoader.ts           # Photo loading helpers
public/
  photos/{category}/         # Gallery images (cherry, japan, korea, trendyol, usa)
  projects/photos/           # Project screenshots
  CNAME                      # Custom domain: burakintisah.com
  404.html                   # SPA routing fallback for GitHub Pages
  favicon.svg
  profile.png
  burak_intisah_resume.pdf
```

## Routes

| Path | Page | Notes |
|------|------|-------|
| `/` | Home | Hero + featured content |
| `/about` | About | In "About" dropdown |
| `/uses` | Uses | In "About" dropdown |
| `/experience` | Experience | Top-level nav |
| `/projects` | Projects | Top-level nav |
| `/blog` | Blog | In "Content" dropdown |
| `/bookshelf` | Bookshelf | In "Content" dropdown |
| `/reading-list` | ReadingList | In "Content" dropdown |
| `/photography` | Photography | Top-level nav |
| `/connect` | Connect | Top-level nav |
| `/analytics` | Analytics | Not in nav; password-protected |

All routes are nested under `<Layout />` which provides the header, nav, footer, and social links sidebar.

## Architecture Decisions

- **SPA on GitHub Pages**: Uses `public/404.html` redirect trick for client-side routing with BrowserRouter
- **No SSR/SSG**: Pure client-side React app
- **Code splitting**: Vite config splits bundles into `vendor` (react/react-dom), `router`, `firebase`, `motion`, `icons`
- **Dark mode**: Class-based (`darkMode: 'class'` in Tailwind), persisted in localStorage, toggled in Layout.tsx
- **Analytics**: Custom Firebase Firestore-based tracking (not Google Analytics), initialized via `useAnalytics` hook in App.tsx
- **Content is inline**: Blog posts, projects, experience, and books are all defined as arrays directly in their page components (no CMS or separate data files except photoManifest)

## Key Conventions

### TypeScript
- Strict mode enabled (`strict: true` in tsconfig.app.json)
- `noUnusedLocals` and `noUnusedParameters` enforced
- Target: ES2020, module resolution: bundler
- Components use `React.FC` type annotation

### Styling
- Tailwind CSS exclusively (no CSS modules, no styled-components)
- All components must include `dark:` variants for dark mode support
- Color system: `primary-{50-950}` (indigo scale) and `gray-{50-950}`
- Font: Inter via `font-sans`
- Container: `container mx-auto px-4 sm:px-6 lg:px-8`
- Section spacing: `py-16` to `py-24`
- Custom animations: `animate-fade-in`, `animate-slide-up`, `animate-shimmer`

### Components
- Entrance animations use `AnimatedSection` wrapper (Framer Motion)
- Standard animation pattern: `initial={{ opacity: 0, y: 30 }}`, `animate={{ opacity: 1, y: 0 }}`, stagger with `delay: index * 0.1`
- Layout uses fixed header (h-16 / pt-16 offset on main), fixed social links (bottom-right), and footer
- Navigation has dropdown menus for "About" and "Content" sections

### File Naming
- Components: PascalCase (`AnimatedSection.tsx`)
- Utilities/hooks/services: camelCase (`useAnalytics.ts`, `analytics.ts`, `photoLoader.ts`)
- Photos: `{location}-{description}-{number}.{ext}` (e.g., `tokyo-shibuya-crossing-1.jpg`)

## Environment Variables

Required in `.env` (never committed). Template in `env.example`:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

All prefixed with `VITE_` for Vite client-side exposure. In CI, these are injected from GitHub Secrets in `.github/workflows/deploy.yml`.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Triggers on push to `main` or manual dispatch
2. Runs `npm ci` then `npm run build` with Firebase env vars from secrets
3. Uploads `/dist` as GitHub Pages artifact
4. Deploys to GitHub Pages

The `CNAME` file in `public/` ensures the custom domain persists across deploys.

## Common Tasks

### Add a new page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx` under the `<Route path="/" element={<Layout />}>` group
3. Add navigation link in `src/components/Layout.tsx` (either top-level or in a dropdown)

### Add a new project
Edit the projects array in `src/pages/Projects.tsx`. Add screenshot to `public/projects/photos/`.

### Add a blog post
Edit the blogPosts array in `src/pages/Blog.tsx`. Posts link to Medium externally.

### Add photos
1. Optimize image (<500KB, JPEG/WebP, max 1200x800px)
2. Place in `public/photos/{category}/`
3. Register in `src/data/photoManifest.ts`

### Update work experience
Edit the experiences array in `src/pages/Experience.tsx`.

## Linting & Type Checking

```bash
npm run lint              # ESLint (flat config in eslint.config.js)
npx tsc --noEmit          # TypeScript type check without emitting
```

ESLint config: TypeScript-ESLint recommended rules + React Hooks rules + React Refresh warnings. Ignores `/dist`.

## No Test Suite

There is currently no testing framework configured. No unit tests or E2E tests exist.

## Troubleshooting

- **404 on refresh in production**: Verify `public/404.html` exists with the redirect script
- **Styles not applying**: Restart dev server; check `tailwind.config.js` content paths include `./src/**/*.{ts,tsx}`
- **Firebase errors**: Check `.env` has all 7 VITE_FIREBASE_* variables; check Firestore rules allow writes
- **Build dependency issues**: `rm -rf node_modules package-lock.json && npm install`
