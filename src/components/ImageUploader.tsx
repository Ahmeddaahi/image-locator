'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export default function ImageUploader({ onUpload, onRemove }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      onUpload(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const handleRemove = () => {
    setPreview(null);
    onRemove();
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-96 rounded-xl overflow-hidden">
            <Image
              src={preview}
              alt="Uploaded preview"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Remove</span>
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ease-in-out
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50 scale-105' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto h-16 w-16 text-gray-400">
              <svg
                className="h-full w-full"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop your image here' : 'Drag and drop your image here'}
              </p>
              <p className="text-sm text-gray-500">
                or click to browse files
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">JPEG</span>
              <span className="bg-gray-100 px-2 py-1 rounded">JPG</span>
              <span className="bg-gray-100 px-2 py-1 rounded">PNG</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 