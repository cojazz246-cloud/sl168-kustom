const destinations = {
  '/go/banner-cta': 'https://dvl.web.id/9Nd3T',
  '/go/page-cta': 'https://dvl.web.id/9Nd3T'
};
export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    const base = destinations[incoming.pathname];
    if (!base) {
      if (incoming.pathname.startsWith('/go/')) return new Response('Not found', { status: 404 });
      return env.ASSETS.fetch(request);
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405 });
    return new Response(null, {
      status: 302,
      headers: {
        Location: base,
        'Cache-Control': 'no-store',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    });
  }
};
