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

  const handleImageRemove = () => {
    setLocation(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Location Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your photos to discover where they were taken. We extract GPS coordinates from your images and display them on an interactive map.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all hover:shadow-2xl">
          <ImageUploader onUpload={handleImageUpload} onRemove={handleImageRemove} />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {location && (
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
            <MapDisplay location={location} />
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Privacy Notice: Your images are processed locally and are not stored on any server.
          </div>
        </div>
      </div>
    </main>
  );
}
