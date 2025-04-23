const POSITIONSTACK_API_KEY = process.env.POSITIONSTACK_API_KEY;
const POSITIONSTACK_URL = 'http://api.positionstack.com/v1/forward';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  if (!address) {
    return new Response(JSON.stringify({ error: 'Address is required' }), { status: 400 });
  }
  try {
    const res = await fetch(
      `${POSITIONSTACK_URL}?access_key=${POSITIONSTACK_API_KEY}&query=${encodeURIComponent(address)}&limit=1`
    );
    const data = await res.json();
    if (data.error?.code === 'rate_limit_reached') {
      return new Response(JSON.stringify({ error: 'Rate limit reached' }), { status: 429 });
    }
    const loc = data.data?.[0];
    if (!loc) throw new Error('No geocode data');
    return new Response(JSON.stringify({ latitude: loc.latitude, longitude: loc.longitude }), {
      status: 200,
    });
  } catch (e) {
    console.error('Geocode error', e.message);
    return new Response(JSON.stringify({ error: 'Failed to geocode' }), { status: 500 });
  }
}