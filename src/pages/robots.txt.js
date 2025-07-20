export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}