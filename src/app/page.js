'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) router.push(`/city/${city}`);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Find Real Estate Projects</h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded-xl w-64"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
          Search
        </button>
      </div>
    </main>
  );
}
