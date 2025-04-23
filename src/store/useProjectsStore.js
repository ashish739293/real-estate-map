import { create } from 'zustand';

export const useProjectsStore = create((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects })
}));

// 7. app/api/scrape/route.js (mock scraper for now)
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  const dummyData = [
    {
      name: 'Dream Homes',
      location: `${city} Downtown`,
      price: '₹40L - ₹80L',
      builder: 'ABC Builders',
      lat: 17.385, // placeholder
      lng: 78.4867
    },
    {
      name: 'Skyline Residency',
      location: `${city} North`,
      price: '₹60L - ₹1.2Cr',
      builder: 'XYZ Constructions',
      lat: 17.4,
      lng: 78.49
    }
  ];

  return NextResponse.json(dummyData);
}
