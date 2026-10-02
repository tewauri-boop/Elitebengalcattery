import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const accept = request.headers.get('accept') || '';

  if (prefersMarkdownOverHtml(accept) && eligiblePath(url.pathname)) {
    try {
      const mdPath = mdPathFor(url.pathname);
      const mdRes = await fetch(new URL(mdPath, request.url));
      if (mdRes.ok) {
        return new Response(await mdRes.text(), {
          headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'access-control-allow-origin': '*',
          },
        });
      }
    } catch {
      // Fall back to Next.js handler
    }
  }

  return NextResponse.next();
}

export function prefersMarkdownOverHtml(accept) {
  let mdQ = -1, htmlQ = -1;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map(s => s.trim());
    let q = 1;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q);
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }
  return mdQ > -1 && mdQ > htmlQ;
}

function eligiblePath(pathname) {
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/thank-you') ||
    pathname.includes('.')
  ) {
    return false;
  }
  return true;
}

function mdPathFor(pathname) {
  return '/llms.txt';
}
