// app/api/scrape/route.js
export const runtime = 'nodejs';
import * as cheerio from 'cheerio';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  if (!city) {
    return new Response(JSON.stringify({ error: 'City is required' }), { status: 400 });
  }

  const targetUrl = `https://www.magicbricks.com/new-projects-${encodeURIComponent(city)}`;
  // ScrapingBee proxy URL
  const proxyUrl = `https://app.scrapingbee.com/api/v1
    ?api_key=${process.env.SCRAPINGBEE_API_KEY}
    &url=${encodeURIComponent(targetUrl)}`.replace(/\s+/g, '');

  try {
    const res = await fetch(proxyUrl);
    if (!res.ok) {
      throw new Error(`Proxy error: ${res.status}`);
    }
    const html = await res.text();
    const $ = cheerio.load(html);
    const projects = [];
    $('.projdis__prjcard').each((_, el) => {
      projects.push({
        name: $(el).find('.mghome__prjblk__prjname').text().trim(),
        location: $(el).find('.mghome__prjblk__locname').text().trim(),
        priceRange: $(el).find('.mghome__prjblk__price').text().trim(),
        builder: $(el).find('.mghome__videocard__author__name').text().trim(),
        image: $(el).find('.mghome__prjblk__imgsec__img').attr('src') || '',
      });
    });
    return new Response(JSON.stringify({ projects }), { status: 200 });
  } catch (err) {
    console.error('Scraping error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
