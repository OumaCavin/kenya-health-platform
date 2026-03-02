import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Facility } from '../../types';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createIcon = (color: string, size: number = 24) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const facilityIcons: Record<string, L.DivIcon> = {
  level6: createIcon('#ef4444', 20),
  level5: createIcon('#f97316', 16),
  level4: createIcon('#eab308', 14),
  level3: createIcon('#22c55e', 12),
  level2: createIcon('#3b82f6', 10),
  specialized: createIcon('#a855f7', 12),
  anomaly: createIcon('#ff0000', 14),
};

interface KenyaMapProps {
  facilities: Facility[];
  onFacilityClick?: (facility: Facility) => void;
  showCoverageZones?: boolean;
  showMedicalDeserts?: boolean;
  center?: [number, number];
  zoom?: number;
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);
  return null;
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#1a1a24] rounded-lg border border-gray-700">
      <div className="text-center text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-2"></div>
        <p className="text-sm">Loading map...</p>
      </div>
    </div>
  );
}

export function KenyaMap({ facilities, onFacilityClick, showCoverageZones = false, showMedicalDeserts = false, center = [-1.2921, 36.8219], zoom = 6 }: KenyaMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ensure facilities is a valid array
  const validFacilities = Array.isArray(facilities) ? facilities.filter(f => f && f.coordinates) : [];

  if (!isClient) {
    return <LoadingFallback />;
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-gray-700" style={{ minHeight: '400px' }}>
      <MapContainer
        key={mapKey}
        center={center}
        zoom={zoom}
        className="w-full h-full"
        style={{ background: '#1a1a24', minHeight: '400px' }}
        scrollWheelZoom={true}
      >
        <MapController center={center} zoom={zoom} />
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {showCoverageZones && validFacilities.filter((f) => f.type === 'level5' || f.type === 'level6').map((facility) => (
          <Circle key={`coverage-${facility.id}`} center={facility.coordinates} radius={30000} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.1, weight: 1 }} />
        ))}
        {showMedicalDeserts && (
          <>
            <Circle center={[3.5, 38.5]} radius={80000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 2, dashArray: '5, 5' }} />
            <Circle center={[2.0, 40.5]} radius={60000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 2, dashArray: '5, 5' }} />
          </>
        )}
        {validFacilities.map((facility) => (
          <Marker
            key={facility.id}
            position={facility.coordinates}
            icon={facility.hasAnomaly ? facilityIcons.anomaly : facilityIcons[facility.type]}
            eventHandlers={{ click: () => onFacilityClick?.(facility) }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-bold text-gray-900">{facility.name}</div>
                <div className="text-gray-600">{facility.typeLabel}</div>
                <div className="text-gray-500 text-xs mt-1">{facility.county} County</div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div><span className="text-gray-500">Caps:</span> {facility.capabilities}</div>
                  <div><span className="text-gray-500">Procs:</span> {facility.procedures}</div>
                  <div><span className="text-gray-500">Equip:</span> {facility.equipment}</div>
                </div>
                {facility.hasAnomaly && <div className="mt-2 text-red-600 text-xs font-medium">⚠ Anomaly Detected</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
