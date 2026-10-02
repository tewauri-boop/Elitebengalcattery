# Auth.md

## Site: Elite Bengal Cattery — Purebred Bengal Cattery

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://DOMAIN.com/shop/ |
| Blog | https://DOMAIN.com/blog/ |
| FAQ | https://DOMAIN.com/faq/ |
| Wholesale | https://DOMAIN.com/wholesale/ |

## Authentication

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

## Ordering
Human-in-the-loop required. Agents may browse and prepare order drafts.
Orders are completed by a human via WhatsApp or the order form.
