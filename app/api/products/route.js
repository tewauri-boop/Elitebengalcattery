import { PRODUCTS, SITE } from '@/src/config/site.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q')?.toLowerCase();
  const limit = parseInt(searchParams.get('limit') || '100', 10);

  let results = PRODUCTS;

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (q) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.colorPattern?.toLowerCase().includes(q)
    );
  }

  const items = results.slice(0, limit).map((p) => ({
    ...p,
    currency: SITE.currency,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  return Response.json(
    {
      total: items.length,
      currency: SITE.currency,
      products: items,
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
