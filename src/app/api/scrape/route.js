/*
Complete Next.js App Router Project with Premium Responsive UI/UX
*/

// app/api/scrape/route.js
import * as cheerio from 'cheerio';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  if (!city) {
    return new Response(JSON.stringify({ error: 'City is required' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
  }

  // Base URL for first page
  const baseUrl = `https://www.magicbricks.com/new-projects-${encodeURIComponent(city)}`;
  const projects = [];
  let nextUrl = baseUrl;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl);
      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract project cards
      $('.projdis__prjcard').each((_, el) => {
        const name = $(el).find('.mghome__prjblk__prjname').text().trim();
        const location = $(el).find('.mghome__prjblk__locname').text().trim();
        const priceRange = $(el).find('.mghome__prjblk__price').text().trim();
        const builder = $(el).find('.mghome__videocard__author__name').text().trim();
        const image = $(el).find('.mghome__prjblk__imgsec__img').attr('src') || '';
        projects.push({ name, location, priceRange, builder, image });
      });

      // Look for 'Next' pagination link
      const nextLink = $('a[rel="next"]').attr('href');
      if (nextLink) {
        nextUrl = nextLink.startsWith('http') ? nextLink : `https://www.magicbricks.com${nextLink}`;
      } else {
        nextUrl = null;
      }
    }

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Scraping error:', err.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
