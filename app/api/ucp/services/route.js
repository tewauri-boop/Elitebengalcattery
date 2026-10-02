// src/app/api/ucp/services/route.js
import { SHOP, SITE, CONTACT } from '@/src/config/site.js';

export async function GET() {
  return Response.json(
    {
      ucp: '1.0',
      protocol_version: '1.0',
      services: [
        {
          id: 'product-catalog',
          type: 'catalog',
          url: `https://${SITE.domain}/shop/`,
          description: 'Full kitten catalog',
        },
        {
          id: 'mcp-server',
          type: 'mcp',
          url: `https://${SITE.domain}/api/mcp`,
          description: 'MCP Streamable HTTP server',
        },
        {
          id: 'order',
          type: 'commerce',
          url: `https://wa.me/${CONTACT.whatsappRaw}`,
          description: 'Reserve kittens via WhatsApp',
        },
        {
          id: 'wholesale',
          type: 'b2b',
          url: `https://${SITE.domain}/wholesale/`,
          description: 'Breeding rights inquiries and pedigree information',
        },
      ],
      currency: SITE.currency,
      payment_methods: SHOP.paymentMethods,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
