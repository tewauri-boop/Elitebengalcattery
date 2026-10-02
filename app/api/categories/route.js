import { CATEGORIES, PRODUCTS, SITE } from '@/src/config/site.js';

export async function GET() {
  const categoriesWithCounts = CATEGORIES.map((c) => ({
    ...c,
    count: PRODUCTS.filter((p) => p.category === c.slug).length,
    url: `https://${SITE.domain}/shop/${c.slug}/`,
  }));

  return Response.json(
    {
      categories: categoriesWithCounts,
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
