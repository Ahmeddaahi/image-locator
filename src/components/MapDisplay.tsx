'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

interface MapDisplayProps {
  location: {
    lat: number;
    lng: number;
  };
}

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

export default function MapDisplay({ location }: MapDisplayProps) {
  const markerIcon = useMemo(() => ({
    url: '/marker.svg',
    scaledSize: { width: 40, height: 40 }
  }), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Photo Location</h2>
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium text-blue-700">
            {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </span>
        </div>
      </div>
      
      <div className="rounded-xl overflow-hidden shadow-lg">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={15}
            options={{
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }]
                }
              ],
              disableDefaultUI: true,
              zoomControl: true,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true
            }}
          >
            <Marker 
              position={location}
              icon={markerIcon}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
} 