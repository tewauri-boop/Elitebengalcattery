# Elite Bengal Cattery — WebForge v9.1

Production-ready Next.js App Router store for **Elite Bengal Cattery** (North Carolina, USA).
Ethically bred purebred Bengal kittens with exceptional wild rosetting, championship bloodlines, and nationwide white-glove pet nanny delivery.

## Features
- **Mobile-First Experience**: Designed and verified for ~380px viewports with zero horizontal scrolling.
- **Single Source of Truth**: `src/config/site.js` powers all pages, metadata, JSON-LD, agent files, and sitemaps.
- **Agent-Ready Architecture**: Full static agent protocol files A–N (`llms.txt`, `auth.md`, `.well-known/*`, `webmcp.js`) + live MCP Streamable HTTP server (`/api/mcp`).
- **Real-Time Client Cart**: LocalStorage cart drawer (`mm-cart`) with instant 10% crypto discount calculation, reservation deposit logic, and direct WhatsApp concierge integration.
- **Complete Schema**: `Store`, `Organization`, `Product`, `Offer`, `BreadcrumbList`, `BlogPosting`, `FAQPage`, and real `SearchAction` linked to `/search/`.
- **Pre-Ship Crosscheck**: Automated verification script (`npm run crosscheck`) checking compliance, zero drift, and structural integrity.

## Development & Build Commands
```bash
# Start local development server
npm run dev

# Regenerate all domain-bearing agent files
npm run gen

# Run the pre-ship verification crosscheck
npm run crosscheck

# Build for production
npm run build
```

## GitHub + Vercel Deployment Instructions
1. Create a new empty repository on GitHub.
2. Push this codebase:
   ```bash
   git init
   git remote add origin https://github.com/[username]/[repo-name].git
   git add .
   git commit -m "Initial build — WebForge v9.1"
   git push -u origin main
   ```
3. Import project into Vercel:
   - Select the GitHub repository.
   - **CRITICAL**: Ensure **Framework Preset** is set to **Next.js**.
   - Deploy.
