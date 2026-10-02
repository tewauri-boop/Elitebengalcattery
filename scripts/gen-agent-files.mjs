// scripts/gen-agent-files.mjs
// Generates all domain-bearing agent files, .well-known/*, llms.txt, robots.txt, vercel.json
// from src/config/site.js as the SINGLE SOURCE OF TRUTH

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, CONTACT, SHOP, BRAND, CATEGORIES, PRODUCTS } from '../src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const domain = SITE.domain;

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Generate vercel.json
const vercelConfig = {
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "trailingSlash": true,
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": `www.${domain}` }],
      "destination": `https://${domain}/:path*`,
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; font-src 'self';" },
        { "key": "Link", "value": `</.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </.well-known/mcp/server-card.json>; rel="service-desc", </auth.md>; rel="auth", </.well-known/openid-configuration>; rel="openid-configuration"` }
      ]
    },
    { "source": "/.well-known/api-catalog", "headers": [{ "key": "Content-Type", "value": "application/linkset+json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/agent-skills/index.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/mcp/server-card.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/oauth-protected-resource", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/oauth-authorization-server", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/openid-configuration", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/acp.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/ucp", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/auth.md", "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/llms.txt", "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/:path*.md", "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }] },
    { "source": "/api/:path*", "headers": [{ "key": "Access-Control-Allow-Origin", "value": "*" }, { "key": "Access-Control-Allow-Methods", "value": "GET, POST, OPTIONS" }, { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Accept, Mcp-Session-Id" }] }
  ]
};
fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));

// 2. Generate public/robots.txt
ensureDir(path.join(rootDir, 'public'));
const robotsTxt = `User-agent: *
Disallow: /thank-you-contact/
Disallow: /thank-you-order/
Disallow: /thank-you-wholesale/
Sitemap: https://${domain}/sitemap.xml

Content-Signal: search=yes, ai-input=yes, ai-train=no

# AI crawlers — welcome to index product and content pages
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

# Agent-readable resources
# llms.txt: https://${domain}/llms.txt
# API Catalog: https://${domain}/.well-known/api-catalog
# Agent Skills: https://${domain}/.well-known/agent-skills/index.json
# MCP Server Card: https://${domain}/.well-known/mcp/server-card.json
`;
fs.writeFileSync(path.join(rootDir, 'public', 'robots.txt'), robotsTxt);

// 3. Generate public/llms.txt
const categoryList = CATEGORIES.map(c => `- [${c.name}](https://${domain}/shop/${c.slug}/): ${c.tagline}`).join('\n');
const llmsTxt = `# ${SITE.name}

> ${SITE.tagline}

${BRAND.description}

Located in ${CONTACT.hq}. Contact via WhatsApp at ${CONTACT.whatsapp} or email at ${CONTACT.email}.
Free white-glove pet courier delivery across the United States. 10% instant discount when reserving via cryptocurrency.

## Available Bengal Kittens
${categoryList}

## Guidance & Information
- [About Our Cattery](https://${domain}/about/): Ethical breeding standards, genetic screening, and family nursery upbringing.
- [Adoption FAQ](https://${domain}/faq/): Reservation steps, health warranties, air courier delivery, and care guidelines.
- [Bengal Education Blog](https://${domain}/blog/): Comprehensive guides to Bengal nutrition, genetics, and home enrichment.
- [Wholesale & Breeding Rights](https://${domain}/wholesale/): Program details and pedigree requirements for ethical catteries.
- [Contact & Live Concierge](https://${domain}/contact/): Reach our adoption team via WhatsApp or reservation inquiries.

## Optional
- [API Catalog](https://${domain}/.well-known/api-catalog): RFC 9727 linkset catalog of available endpoints.
- [Agent Skills](https://${domain}/.well-known/agent-skills/index.json): Machine-readable skill descriptors for AI agents.
- [MCP Server Card](https://${domain}/.well-known/mcp/server-card.json): Model Context Protocol streamable HTTP server specification.
- [Authentication & Agent Access](https://${domain}/auth.md): Open public catalog access documentation.
`;
fs.writeFileSync(path.join(rootDir, 'public', 'llms.txt'), llmsTxt);

// 4. Generate public/auth.md (MUST start with exactly "# Auth.md")
const authMd = `# Auth.md

## Site: ${SITE.name} — Purebred Bengal Cattery

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://${domain}/shop/ |
| Blog | https://${domain}/blog/ |
| FAQ | https://${domain}/faq/ |
| Wholesale | https://${domain}/wholesale/ |

## Authentication

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

## Ordering
Human-in-the-loop required. Agents may browse and prepare order drafts.
Orders are completed by a human via WhatsApp or the order form.
`;
fs.writeFileSync(path.join(rootDir, 'public', 'auth.md'), authMd);

// 5. Generate IndexNow file public/[SITE.indexNowKey].txt
if (SITE.indexNowKey) {
  fs.writeFileSync(path.join(rootDir, 'public', `${SITE.indexNowKey}.txt`), SITE.indexNowKey);
}

// 6. Generate public/.well-known/* files
ensureDir(path.join(rootDir, 'public', '.well-known'));
ensureDir(path.join(rootDir, 'public', '.well-known', 'agent-skills'));
ensureDir(path.join(rootDir, 'public', '.well-known', 'mcp'));

// D: api-catalog
const apiCatalog = {
  "linkset": [
    { "anchor": `https://${domain}/`, "https://www.iana.org/assignments/link-relations/service-doc": [{ "href": `https://${domain}/faq/` }], "title": `${SITE.name} — ${SITE.tagline}` },
    { "anchor": `https://${domain}/shop/`, "type": "text/html", "title": `${SITE.name} Kitten Catalog` },
    { "anchor": `https://${domain}/wholesale/`, "type": "text/html", "title": `${SITE.name} Breeding Rights` },
    { "anchor": `https://${domain}/api/products`, "type": "application/json", "title": `${SITE.name} Products API` },
    { "anchor": `https://${domain}/api/categories`, "type": "application/json", "title": `${SITE.name} Categories API` },
    { "anchor": `https://${domain}/api/search`, "type": "application/json", "title": `${SITE.name} Search API` },
    { "anchor": `https://${domain}/api/mcp`, "type": "application/json", "https://www.iana.org/assignments/link-relations/service-desc": [{ "href": `https://${domain}/.well-known/mcp/server-card.json` }], "title": `${SITE.name} MCP Server` }
  ]
};
fs.writeFileSync(path.join(rootDir, 'public', '.well-known', 'api-catalog'), JSON.stringify(apiCatalog, null, 2));

// E: agent-skills/index.json
const agentSkills = {
  "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
  "name": SITE.name,
  "url": `https://${domain}`,
  "description": SITE.tagline,
  "skills": [
    { "name": "search-products", "type": "commerce", "description": "Search available Bengal kittens by keyword, category, or price", "url": `https://${domain}/api/mcp`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "browse-catalog", "type": "navigation", "description": "Browse the full kitten catalog by category", "url": `https://${domain}/shop/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "order-draft", "type": "commerce", "description": "Create a prefilled kitten reservation draft. Human completes the reservation.", "url": `https://${domain}/api/mcp`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "wholesale-inquiry", "type": "commerce", "description": "Breeding rights tiers and pedigree inquiries", "url": `https://${domain}/wholesale/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "product-education", "type": "content", "description": "Educational Bengal cat blog and care guides", "url": `https://${domain}/blog/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "contact", "type": "support", "description": "Contact for kitten adoption questions or support", "url": `https://${domain}/contact/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }
  ]
};
fs.writeFileSync(path.join(rootDir, 'public', '.well-known', 'agent-skills', 'index.json'), JSON.stringify(agentSkills, null, 2));

// F: mcp/server-card.json (Vercel live variant)
const mcpServerCard = {
  "$schema": "https://modelcontextprotocol.io/schemas/server-card/v1.json",
  "serverInfo": {
    "name": SITE.name,
    "version": "1.0.0",
    "description": SITE.tagline,
    "homepage": `https://${domain}`,
    "contact": { "email": CONTACT.email, "whatsapp": CONTACT.whatsapp }
  },
  "transport": {
    "type": "streamable-http",
    "endpoint": `https://${domain}/api/mcp`
  },
  "capabilities": {
    "tools": [
      {
        "name": "search_products",
        "description": "Search available Bengal kittens by keyword, category, max_price",
        "inputSchema": { "type": "object", "properties": { "query": { "type": "string" }, "category": { "type": "string" }, "max_price": { "type": "number" } } }
      },
      {
        "name": "get_product",
        "description": "Get full kitten details by slug",
        "inputSchema": { "type": "object", "required": ["slug"], "properties": { "slug": { "type": "string" } } }
      },
      {
        "name": "list_categories",
        "description": "List all Bengal kitten categories",
        "inputSchema": { "type": "object", "properties": {} }
      },
      {
        "name": "get_policies",
        "description": "Get delivery, deposit, health guarantee, payment policies",
        "inputSchema": { "type": "object", "properties": {} }
      },
      {
        "name": "create_order_draft",
        "description": "Create prefilled adoption draft URL. Human completes — never captures payment.",
        "inputSchema": { "type": "object", "properties": { "items": { "type": "array" }, "notes": { "type": "string" } } }
      }
    ],
    "resources": [
      { "name": "product-catalog", "description": "Full kitten catalog", "uri": `https://${domain}/shop/` },
      { "name": "wholesale", "description": "Breeding rights", "uri": `https://${domain}/wholesale/` },
      { "name": "blog", "description": "Educational content", "uri": `https://${domain}/blog/` }
    ],
    "commerce": {
      "ordering": "human-assisted-whatsapp-or-form",
      "payment": SHOP.paymentMethods,
      "currency": SITE.currency,
      "minimumOrder": "0",
      "freeShipping": "Free White-Glove Pet Courier Delivery"
    }
  },
  "legal": {
    "ageRestriction": "none",
    "productType": "Purebred Bengal Kittens",
    "compliance": "TICA Registered Ethical Cattery"
  }
};
fs.writeFileSync(path.join(rootDir, 'public', '.well-known', 'mcp', 'server-card.json'), JSON.stringify(mcpServerCard, null, 2));

// G: oauth-protected-resource
const oauthProtectedResource = {
  "resource": `https://${domain}`,
  "resource_name": `${SITE.name} Public Catalog`,
  "authorization_servers": [],
  "scopes_supported": [],
  "bearer_methods_supported": [],
  "resource_documentation": `https://${domain}/auth.md`,
  "resource_policy_uri": `https://${domain}/faq/`,
  "tls_client_certificate_bound_access_tokens": false,
  "note": `All resources on ${domain} are publicly accessible. No OAuth tokens required.`
};
fs.writeFileSync(path.join(rootDir, 'public', '.well-known', 'oauth-protected-resource'), JSON.stringify(oauthProtectedResource, null, 2));

// H: oauth-authorization-server
const oauthAuthServer = {
  "issuer": `https://${domain}`,
  "authorization_endpoint": null,
  "token_endpoint": null,
  "jwks_uri": null,
  "grant_types_supported": [],
  "response_types_supported": [],
  "scopes_supported": [],
  "note": `${SITE.name} has no protected APIs. All resources publicly accessible.`,
  "public_resources": [
    `https://${domain}/shop/`,
    `https://${domain}/blog/`,
    `https://${domain}/faq/`,
    `https://${domain}/wholesale/`,
    `https://${domain}/llms.txt`,
    `https://${domain}/.well-known/api-catalog`,
    `https://${domain}/.well-known/agent-skills/index.json`,
    `https://${domain}/.well-known/mcp/server-card.json`
  ],
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No registration required. All content publicly accessible to agents."
  }
};
fs.writeFileSync(path.join(rootDir, 'public', '.well-known', 'oauth-authorization-server'), JSON.stringify(oauthAuthServer, null, 2));

// I: openid-configuration
const openidConfig = {
  "issuer": `https://${domain}`,
  "note": `${SITE.name} does not operate an OpenID Connect provider. All resources publicly accessible.`,
  "public_site": true,
  "authorization_endpoint": null,
  "token_endpoint": null,
  "userinfo_endpoint": null,
  "jwks_uri": null,
  "scopes_supported": [],
  "response_types_supported": [],
  "grant_types_supported": [],
  "subject_types_supported": [],
  "id_token_signing_alg_values_supported": []
};
fs.writeFileSync(path.join(rootDir, 'public', '.well-known', 'openid-configuration'), JSON.stringify(openidConfig, null, 2));

// J: acp.json
const acpJson = {
  "protocol": { "name": "acp", "version": "0.1.0" },
  "name": SITE.name,
  "description": SITE.tagline,
  "api_base_url": `https://${domain}`,
  "homepage": `https://${domain}`,
  "transports": ["https"],
  "capabilities": {
    "services": ["product-catalog", "wholesale", "blog", "faq", "mcp-server"],
    "ordering": "human-assisted",
    "payment_methods": SHOP.paymentMethods,
    "currency": SITE.currency,
    "minimum_order_usd": "0",
    "free_shipping_threshold_usd": "0"
  },
  "contact": {
    "whatsapp": `https://wa.me/${CONTACT.whatsappRaw}`,
    "email": CONTACT.email
  },
  "legal": {
    "age_restriction": "none",
    "region": "United States",
    "ships_to": "United States (Nationwide Courier)",
    "product_type": "Purebred Bengal Kittens",
    "compliance": "TICA Registered Ethical Cattery"
  }
};
fs.writeFileSync(path.join(rootDir, 'public', '.well-known', 'acp.json'), JSON.stringify(acpJson, null, 2));

// K: ucp (MUST include "ucp": "1.0")
const ucpJson = {
  "ucp": "1.0",
  "protocol_version": "1.0",
  "spec": "https://ucp.dev/specification/overview/",
  "schema": "https://ucp.dev/schema/v1.json",
  "site": `https://${domain}`,
  "name": SITE.name,
  "description": SITE.tagline,
  "services": [
    { "id": "product-catalog", "type": "catalog", "url": `https://${domain}/shop/`, "description": "Full kitten catalog" },
    { "id": "mcp-server", "type": "mcp", "url": `https://${domain}/api/mcp`, "description": "MCP Streamable HTTP server" },
    { "id": "order", "type": "commerce", "url": `https://wa.me/${CONTACT.whatsappRaw}`, "description": "Place orders via WhatsApp" },
    { "id": "wholesale", "type": "b2b", "url": `https://${domain}/wholesale/`, "description": "Breeding rights inquiries and pedigree information" }
  ],
  "capabilities": ["browse", "search", "inquiry", "wholesale", "content", "mcp"],
  "endpoints": {
    "mcp": `https://${domain}/api/mcp`,
    "catalog": `https://${domain}/shop/`,
    "contact": `https://${domain}/contact/`,
    "agent_skills": `https://${domain}/.well-known/agent-skills/index.json`,
    "mcp_server_card": `https://${domain}/.well-known/mcp/server-card.json`,
    "api_catalog": `https://${domain}/.well-known/api-catalog`,
    "llms_txt": `https://${domain}/llms.txt`
  },
  "currency": SITE.currency,
  "minimum_order_usd": "0",
  "payment_methods": SHOP.paymentMethods,
  "legal": {
    "age_restriction": "none",
    "product_type": "Purebred Bengal Kittens",
    "compliance": "TICA Registered Ethical Cattery"
  }
};
fs.writeFileSync(path.join(rootDir, 'public', '.well-known', 'ucp'), JSON.stringify(ucpJson, null, 2));

// L: /js/webmcp.js
ensureDir(path.join(rootDir, 'public', 'js'));
const webMcpJs = `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search ${SITE.name} kittens by keyword, category, or price",
        inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(\`https://${domain}/api/search?\${params}\`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse kittens by category",
        inputSchema: { type: "object", properties: { category: { type: "string" } } },
        execute: async ({ category }) => {
          const url = category ? \`https://${domain}/shop/\${category}/\` : \`https://${domain}/shop/\`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp kitten reservation. Free pet courier delivery included.",
        inputSchema: { type: "object", properties: { message: { type: "string" } } },
        execute: async ({ message }) => {
          const url = message ? \`https://wa.me/${CONTACT.whatsappRaw}?text=\${encodeURIComponent(message)}\` : \`https://wa.me/${CONTACT.whatsappRaw}\`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "get_wholesale_info",
        description: "Get breeding rights tiers and pedigree information",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`https://${domain}/wholesale/\`;
          return { url: \`https://${domain}/wholesale/\` };
        }
      },
      {
        name: "contact",
        description: "Contact ${SITE.name} for questions or support",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`https://${domain}/contact/\`;
          return { url: \`https://${domain}/contact/\` };
        }
      }
    ]
  });
})();
`;
fs.writeFileSync(path.join(rootDir, 'public', 'js', 'webmcp.js'), webMcpJs);

console.log('✅ Successfully generated all agent files, .well-known/*, and vercel.json from SITE.domain:', domain);
