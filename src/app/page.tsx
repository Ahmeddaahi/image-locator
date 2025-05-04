'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import MapDisplay from '@/components/MapDisplay';
import { parse } from 'exifr';

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      const exifData = await parse(file);
      
      if (exifData?.latitude && exifData?.longitude) {
        setLocation({
          lat: exifData.latitude,
          lng: exifData.longitude
        });
        setError(null);
      } else {
        setError('No GPS data found in the image.');
        setLocation(null);
      }
    } catch {
      setError('Error processing image. Please try another image.');
      setLocation(null);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Image Location Finder</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <ImageUploader onUpload={handleImageUpload} />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {location && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <MapDisplay location={location} />
          </div>
        )}

        <div className="mt-8 text-sm text-gray-600 text-center">
          <p>Privacy Notice: Your images are processed locally and are not stored on any server.</p>
        </div>
      </div>
    </main>
  );
}
