# Elite Bengal Cattery — Project Strategy & Architecture

## Overview
- **Brand:** Elite Bengal Cattery
- **Tagline:** Preserving the Wild Heritage, Rosetted Splendor & Gentle Loving Temperament of Purebred Bengal Cats
- **HQ:** North Carolina, United States
- **Target Platform:** Next.js App Router (Vercel)
- **Architecture:** WebForge v9.1 E-Commerce Engine & Agent Protocol Hub

## Core Value Propositions
1. **Ethical Hobby Breeder:** TICA registered cattery adhering strictly to responsible breeding codes of ethics.
2. **Genetic Security:** 100% parental clearance for PK-Def (N/N), PRA-b (N/N), and annual HCM echocardiograms by veterinary cardiologists.
3. **White-Glove Delivery:** Free in-cabin flight pet nanny hand-delivery across all continental US states.
4. **2-Year Congenital Warranty:** Comprehensive written replacement guarantee.
5. **Modern Commerce:** Direct WhatsApp concierge reservation with a 10% instant discount for Bitcoin (BTC) and USDT payments.

## Site Structure & Page Inventory
- `/` — Homepage (Hero, Trust Bar, Featured Kittens, Color Varieties, 12 Authority Signals, Adoption Guide, FAQ, CTA)
- `/shop/` — Complete Available Kittens Catalog (Filter by pattern, price sorting, reservation basket)
- `/shop/[category]/` — Category hubs (Brown Rosetted, Snow Bengals, Silver & Charcoal, Breeding Rights)
- `/shop/[category]/[slug]/` — Individual Kitten Profile (Interactive gallery, health panel, pedigree, reserve via WhatsApp)
- `/about/` — In-depth Cattery Story (>700 words, founding history, 4 pillars, milestones timeline, flight logistics)
- `/faq/` — Comprehensive Adoption & Health FAQ (40-60 word concise direct-answer format)
- `/blog/` — Bengal Care & Genetics Journal
- `/blog/[slug]/` — Educational Guides
- `/wholesale/` — TICA Breeding & Show Rights Application
- `/contact/` — Adoption Concierge Contact Form (Web3Forms CORS method)
- `/search/` — Client-side catalog search
- `/thank-you-contact/` — noindex confirmation
- `/thank-you-order/` — noindex reservation confirmation
- `/thank-you-wholesale/` — noindex breeder application confirmation
- `/not-found` — noindex 404 handler

## Agent Protocol Integration (A–N & V1–V6)
- **robots.txt:** Explicit allowances for GPTBot, ClaudeBot, PerplexityBot, Applebot, Amazonbot, etc.
- **llms.txt:** RFC-standard clean markdown summary with catalog and authority links.
- **auth.md:** Public access documentation with zero auth hurdles for browsing agents.
- **.well-known/api-catalog:** RFC 9727 linkset referencing real APIs.
- **.well-known/agent-skills/index.json:** Commerce and navigation skills index.
- **.well-known/mcp/server-card.json:** MCP Streamable HTTP server declaration.
- **.well-known/acp.json & .well-known/ucp:** Protocol versions and endpoint mappings ("ucp": "1.0").
- **API Endpoints:**
  - `/api/mcp` (Streamable HTTP MCP JSON-RPC Server)
  - `/api/products`, `/api/products/[slug]`, `/api/categories`, `/api/search`
  - `/api/acp/catalog`, `/api/ucp/services`
  - `/api/contact`
- **Markdown Content Negotiation:** `middleware.js` with q-value parsing for AI bots requesting `text/markdown`.
