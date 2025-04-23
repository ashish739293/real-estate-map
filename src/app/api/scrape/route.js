// app/api/scrape/route.js
export const runtime = 'nodejs';
import * as cheerio from 'cheerio';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  if (!city) return new Response(JSON.stringify({ error: 'City is required' }), { status: 400 });

  const url = `https://www.magicbricks.com/new-projects-${encodeURIComponent(city)}`;
  const fetchOptions = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/114.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml'
    }
  };

  try {
    const res = await fetch(url, fetchOptions);
    const html = await res.text();

    console.log('Fetched HTML (200 chars):', html.slice(0, 200));

    const $ = cheerio.load(html);
    const projects = [];

    $('.projdis__prjcard').each((_, el) => {
      projects.push({
        name: $(el).find('.mghome__prjblk__prjname').text().trim(),
        location: $(el).find('.mghome__prjblk__locname').text().trim(),
        priceRange: $(el).find('.mghome__prjblk__price').text().trim(),
        builder: $(el).find('.mghome__videocard__author__name').text().trim(),
        image: $(el).find('.mghome__prjblk__imgsec__img').attr('src') || ''
      });
    });

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (err) {
    console.error('Scraping error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
