'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapDisplayProps {
  location: {
    lat: number;
    lng: number;
  };
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

export default function MapDisplay({ location }: MapDisplayProps) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-gray-600">
          Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
        </p>
      </div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={location}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
} 