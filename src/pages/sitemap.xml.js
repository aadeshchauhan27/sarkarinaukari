export async function GET() {
  const baseUrl = 'https://your-domain.com';
  
  const staticPages = [
    '/',
    '/latest-jobs',
    '/admit-cards',
    '/results',
    '/syllabus',
    '/admin'
  ];

  // In a real implementation, you would fetch actual content
  const dynamicPages = [
    '/latest-jobs/ssc-mts-havildar-2025',
    '/admit-cards/nta-neet-admit-card-2025',
    '/results/ssc-cgl-result-2025'
  ];

  const pages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}