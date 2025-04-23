'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects, setLoading } from '@/store/projectSlice';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import ProjectCard from '@/components/ProjectCard';
import Spinner from '@/components/Spinner';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function CityPage() {
  const { cityName } = useParams();
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.projects);
  const [selected, setSelected] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    fetch(`/api/scrape?city=${encodeURIComponent(cityName)}`)
      .then((r) => r.json())
      .then((data) => dispatch(setProjects(data)));
  }, [cityName, dispatch]);

  const handleClick = async (proj) => {
    setGeoLoading(true);
    const addr = `${proj.location}, ${cityName}, India`;
    try {
      const res = await fetch(
        `/api/geocode?address=${encodeURIComponent(addr)}`
      );
      const js = await res.json();
      setSelected({ ...proj, latitude: js.latitude, longitude: js.longitude });
    } catch {
      setSelected(proj);
    } finally {
      setGeoLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Header with Home button */}
      <div className="col-span-full flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Projects in {cityName}</h1>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Home
        </Link>
      </div>

      {/* Projects list */}
      <div className="overflow-y-auto max-h-[75vh] space-y-4 pr-2">
        {loading ? (
          <Spinner />
        ) : (
          list.map((p, i) => (
            <div
              key={i}
              onClick={() => handleClick(p)}
              className="cursor-pointer transform hover:scale-105 transition"
            >
              <ProjectCard project={p} />
            </div>
          ))
        )}
        {geoLoading && (
          <p className="text-blue-600 text-center mt-2">Locating…</p>
        )}
      </div>

      {/* Map view */}
      <div className="h-[75vh] rounded-lg overflow-hidden">
        <MapView selected={selected} />
      </div>
    </div>
  );
}
