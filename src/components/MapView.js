'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords[0] != null && coords[1] != null) {
      map.flyTo(coords, 14);
    }
  }, [coords, map]);
  return null;
}

export default function MapView({ selected }) {
  // Default center if no valid selection
  const defaultCenter = [20.5937, 78.9629];
  // Only use selected coords if both latitude and longitude are valid numbers
  const hasValidCoords =
    selected &&
    typeof selected.latitude === 'number' &&
    typeof selected.longitude === 'number';

  const center = hasValidCoords
    ? [selected.latitude, selected.longitude]
    : defaultCenter;

  return (
    <MapContainer center={center} zoom={12} className="w-full h-full">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Only render marker and fly-to when coords valid */}
      {hasValidCoords && (
        <>
          <Marker position={[selected.latitude, selected.longitude]}>             
            <Popup>
              <strong className="text-indigo-700">{selected.name}</strong><br />
              <span className="text-green-600">{selected.priceRange}</span><br />
              <span className="text-sm text-gray-600">By {selected.builder}</span>
            </Popup>
          </Marker>
          <FlyTo coords={[selected.latitude, selected.longitude]} />
        </>
      )}
    </MapContainer>
  );
}