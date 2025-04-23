<<<<<<< HEAD
# Real Estate Map Listing

This Next.js App Router project fetches real estate project listings from MagicBricks, geocodes their locations using the PositionStack API, and displays them incrementally on an interactive Leaflet map. It uses Server-Sent Events (SSE) for real-time streaming, Redux Toolkit for state management, and Tailwind CSS for a premium responsive UI.

## Features

- **Dynamic City Routing**: `/city/[cityName]` pages fetch new-project listings for the given city.
- **Real-Time Incremental Loading**: Projects streamed to client via SSE as soon as each is scraped and geocoded.
- **Geocoding**: On-the-fly latitude/longitude lookup with PositionStack API.
- **Interactive Map**: Clickable project markers on Leaflet map, with fly-to animation and popups.
- **Responsive Design**: Modern Tailwind-based layout, glassmorphic scrollable list, premium look.
- **Error & Completion Handling**: Graceful SSE error handling and end-of-stream notification.

## Tech Stack

- **Framework**: Next.js App Router
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Map**: React-Leaflet (Leaflet.js)
- **Scraping**: Cheerio
- **Streaming**: Server-Sent Events (SSE)
- **Geocoding**: PositionStack API

## Getting Started

### Prerequisites

- Node.js v16+ and npm/yarn
- A free PositionStack API key ([signup here](https://positionstack.com))

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/ashish739293/real-estate-map.git
   cd real-estate-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root:
   ```ini
   POSITIONSTACK_API_KEY=your_api_key_here
   SCRAPINGBEE_API_KEY=your_scrapingbee_key
   ```

### Running Locally
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
>>>>>>> 175cc70 (Initial commit from Create Next App)

```bash
npm run dev
# or
yarn dev
<<<<<<< HEAD
```
Visit `http://localhost:3000` and navigate to `/city/Hyderabad` (or any city slug).

### Build for Production

```bash
npm run build
npm start
```  
Or deploy directly to Vercel via GitHub integration.

## Usage

1. Open your browser to `https://your-domain.com/city/{cityName}`.
2. Watch project cards appear in the scrollable list as they are scraped and geocoded.
3. Click any project card to fly the map to its exact location with details popup.

## Folder Structure

```
/real-estate-map
├── app
│   ├── api
│   │   ├── scrape-sse
│   │   │   └── route.js        # SSE scraping + geocoding
│   │   └── geocode
│   │       └── route.js        # PositionStack lookup
│   ├── city
│   │   └── [cityName]
│   │       └── page.js         # Client page with SSE listener
│   ├── globals.css            # Tailwind base imports
│   └── layout.js              # RootLayout with Redux provider
├── components
│   ├── MapView.js             # Leaflet map + fly-to logic
│   ├── ProjectCard.js         # Project card UI
│   └── Spinner.js             # Premium loader
├── store
│   ├── projectSlice.js        # Redux slice: addProject, setCompleted, setError
│   ├── store.js               # Configure Redux store
│   └── Provider.js            # React-Redux provider
├── .env.local                 # Environment variables
├── tailwind.config.js         # Tailwind config
└── package.json
```

## API Routes

- **`GET /api/scrape-sse?city={cityName}`**  
  Streams `event: project` messages as JSON objects with scraped + geocoded data.  
- **`GET /api/geocode?address={urlEncodedAddress}`**  
  Returns `{ latitude, longitude }` or an error object.

## Contributing

Contributions welcome! Please open an issue or submit a pull request.

## License

MIT © Ashish kumar

=======
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 175cc70 (Initial commit from Create Next App)
