import { PRODUCTS, POSTS, SITE } from '@/src/config/site.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  if (!q) {
    return Response.json(
      { query: '', products: [], posts: [] },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  const matchingProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colorPattern?.toLowerCase().includes(q)
  ).map((p) => ({
    ...p,
    currency: SITE.currency,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  const matchingPosts = POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
  ).map((post) => ({
    ...post,
    url: `https://${SITE.domain}/blog/${post.slug}/`,
  }));

  return Response.json(
    {
      query: q,
      total: matchingProducts.length + matchingPosts.length,
      products: matchingProducts,
      posts: matchingPosts,
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
