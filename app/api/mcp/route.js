import { PRODUCTS, CATEGORIES, SHOP, SITE, CONTACT } from '@/src/config/site.js';

const MCP_TOOLS = [
  {
    name: 'search_products',
    description: 'Search available Bengal kittens by keyword, category, max_price',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        category: { type: 'string' },
        max_price: { type: 'number' },
      },
    },
  },
  {
    name: 'get_product',
    description: 'Get full kitten details by slug',
    inputSchema: {
      type: 'object',
      required: ['slug'],
      properties: {
        slug: { type: 'string' },
      },
    },
  },
  {
    name: 'list_categories',
    description: 'List all Bengal kitten categories',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_policies',
    description: 'Get delivery, deposit, health guarantee, payment policies',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'create_order_draft',
    description: 'Create prefilled adoption draft URL. Human completes — never captures payment.',
    inputSchema: {
      type: 'object',
      properties: {
        items: { type: 'array' },
        notes: { type: 'string' },
      },
    },
  },
];

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  return Response.json(
    {
      name: SITE.name,
      version: '1.0.0',
      transport: 'streamable-http',
      status: 'active',
      tools: MCP_TOOLS.map((t) => t.name),
    },
    { headers: corsHeaders }
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { jsonrpc = '2.0', id, method, params } = body;

    if (method === 'initialize') {
      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2025-03-26',
            capabilities: { tools: {} },
            serverInfo: {
              name: SITE.name,
              version: '1.0.0',
            },
          },
        },
        { headers: corsHeaders }
      );
    }

    if (method === 'tools/list') {
      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            tools: MCP_TOOLS,
          },
        },
        { headers: corsHeaders }
      );
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === 'search_products') {
        const q = (args.query || '').toLowerCase();
        const cat = args.category;
        const maxPrice = args.max_price;

        let results = PRODUCTS;
        if (cat) results = results.filter((p) => p.category === cat);
        if (maxPrice) results = results.filter((p) => p.price <= maxPrice);
        if (q) {
          results = results.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.shortDescription.toLowerCase().includes(q) ||
              p.colorPattern?.toLowerCase().includes(q)
          );
        }

        const formatted = results.map((p) => ({
          slug: p.slug,
          name: p.name,
          price: p.price,
          currency: SITE.currency,
          category: p.category,
          shortDescription: p.shortDescription,
          badge: p.badge,
          url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
        }));

        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(formatted, null, 2) }],
            },
          },
          { headers: corsHeaders }
        );
      }

      if (toolName === 'get_product') {
        const product = PRODUCTS.find((p) => p.slug === args.slug);
        if (!product) {
          return Response.json(
            {
              jsonrpc: '2.0',
              id,
              error: { code: -32602, message: `Kitten with slug '${args.slug}' not found` },
            },
            { status: 404, headers: corsHeaders }
          );
        }

        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      ...product,
                      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
                      currency: SITE.currency,
                    },
                    null,
                    2
                  ),
                },
              ],
            },
          },
          { headers: corsHeaders }
        );
      }

      if (toolName === 'list_categories') {
        const cats = CATEGORIES.map((c) => ({
          slug: c.slug,
          name: c.name,
          tagline: c.tagline,
          count: PRODUCTS.filter((p) => p.category === c.slug).length,
          url: `https://${SITE.domain}/shop/${c.slug}/`,
        }));

        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(cats, null, 2) }],
            },
          },
          { headers: corsHeaders }
        );
      }

      if (toolName === 'get_policies') {
        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      delivery: 'Complimentary in-cabin white-glove flight pet nanny hand delivery nationwide across the US.',
                      deposit: '$500 reservation deposit holds any available kitten. Balance due on delivery.',
                      healthGuarantee: '2-Year Congenital & Hereditary Genetic Health Guarantee. 100% negative for PK-Def, PRA-b, and regular echocardiogram heart screenings.',
                      paymentMethods: SHOP.paymentMethods,
                      cryptoDiscount: `${SHOP.cryptoDiscount}% instant discount on Bitcoin, USDT, and crypto transactions.`,
                      orderingModel: 'Human-in-the-loop assisted reservation via WhatsApp or reservation form. Never automated payment capture.',
                    },
                    null,
                    2
                  ),
                },
              ],
            },
          },
          { headers: corsHeaders }
        );
      }

      if (toolName === 'create_order_draft') {
        const items = args.items || [];
        const notes = args.notes || '';
        const itemListText = items
          .map((item) => `- ${item.name || item.slug} (Price: $${item.price || 'N/A'})`)
          .join('\n');

        const message = `Hello Elite Bengal Cattery! I would like to reserve the following Bengal kitten(s):\n${itemListText}\n${notes ? `Notes: ${notes}\n` : ''}`;
        const waUrl = `https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(message)}`;
        const formUrl = `https://${SITE.domain}/contact/`;

        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      status: 'draft_prepared',
                      notice: 'Human-assisted completion required. Payment is never processed by AI.',
                      whatsappReservationUrl: waUrl,
                      orderFormUrl: formUrl,
                      selectedItems: items,
                    },
                    null,
                    2
                  ),
                },
              ],
            },
          },
          { headers: corsHeaders }
        );
      }

      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Tool '${toolName}' not found` },
        },
        { status: 404, headers: corsHeaders }
      );
    }

    return Response.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method '${method}' not supported` },
      },
      { status: 400, headers: corsHeaders }
    );
  } catch (err) {
    return Response.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: 'Parse error', details: err?.message },
      },
      { status: 400, headers: corsHeaders }
    );
  }
}
