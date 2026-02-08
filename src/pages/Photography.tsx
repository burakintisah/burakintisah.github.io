import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { createPhotoManifest, Photo } from '../utils/photoLoader';
import { PHOTO_MANIFEST } from '../data/photoManifest';

// Photo card component with optimized loading and responsive design
const PhotoCard: React.FC<{
  photo: Photo;
  onOpen: (photo: Photo) => void;
}> = ({ photo, onOpen }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions({ 
      width: img.naturalWidth, 
      height: img.naturalHeight 
    });
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Calculate optimal height based on aspect ratio with constraints
  const calculateHeight = () => {
    if (!imageDimensions) return 300;
    
    const aspectRatio = imageDimensions.height / imageDimensions.width;
    const baseWidth = 300;
    const calculatedHeight = baseWidth * aspectRatio;
    
    // Constrain height between 200px and 400px for better layout
    return Math.min(Math.max(calculatedHeight, 200), 400);
  };

  const cardHeight = imageLoaded ? calculateHeight() : 300;

  return (
    <div 
      className="relative cursor-pointer overflow-hidden rounded-lg group break-inside-avoid mb-4 transition-transform duration-300 hover:scale-[1.02]"
      onClick={() => onOpen(photo)}
      style={{ height: `${cardHeight}px` }}
    >
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 dark:text-gray-500 text-sm font-medium">
              Loading photo...
            </div>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {imageError && (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 dark:text-gray-500 text-4xl mb-2">📷</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              Failed to load photo
            </div>
          </div>
        </div>
      )}
      
      {/* Main image */}
      {!imageError && (
        <img 
          src={photo.url} 
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ 
            imageRendering: 'auto',
            filter: imageLoaded ? 'none' : 'blur(5px)'
          }}
        />
      )}
      
      {/* Hover overlay */}
      {imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm font-medium">View Photo</span>
          </div>
        </div>
      )}
      
      {/* Folder badge */}
      {imageLoaded && !imageError && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-medium">
          {photo.folder}
        </div>
      )}
    </div>
  );
};

// Filter button component for reusability
const FilterButton: React.FC<{
  folder: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ folder, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isSelected
        ? 'bg-primary-600 text-white dark:bg-primary-500 shadow-lg transform scale-105'
        : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-105'
    }`}
  >
    {folder}
  </button>
);

// Lightbox component for better organization
const Lightbox: React.FC<{
  photo: Photo;
  onClose: () => void;
}> = ({ photo, onClose }) => (
  <div 
    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <button 
      className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      onClick={onClose}
      aria-label="Close lightbox"
    >
      <X className="h-8 w-8" />
    </button>
    <div 
      className="max-w-4xl max-h-[90vh] relative"
      onClick={(e) => e.stopPropagation()}
    >
      <img 
        src={photo.url} 
        alt={photo.alt} 
        className="max-w-full max-h-[90vh] object-contain rounded-lg"
      />
      <div className="text-white text-center mt-4">
        <p className="text-lg font-medium">{photo.alt}</p>
        <p className="text-sm text-gray-300 mt-1">{photo.folder}</p>
      </div>
    </div>
  </div>
);

// Main Photography component
const Photography: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Generate photos from manifest
  const photos: Photo[] = useMemo(() => {
    return createPhotoManifest(PHOTO_MANIFEST);
  }, []);

  // Get available folders
  const folders = useMemo(() => {
    const uniqueFolders = Array.from(new Set(photos.map(photo => photo.folder)));
    return ['All', ...uniqueFolders.sort()];
  }, [photos]);

  // Handle URL parameters for deep linking
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam && folders.includes(filterParam)) {
      setSelectedFolder(filterParam);
    }
  }, [searchParams, folders]);

  // Filter and organize photos
  const displayedPhotos = useMemo(() => {
    let filteredPhotos = selectedFolder === 'All' 
      ? photos 
      : photos.filter(photo => photo.folder === selectedFolder);
    
    // Shuffle photos when showing all for visual variety
    if (selectedFolder === 'All') {
      filteredPhotos = [...filteredPhotos].sort(() => Math.random() - 0.5);
    }
    
    return filteredPhotos;
  }, [photos, selectedFolder]);

  // Handle filter changes with URL updates
  const handleFilterChange = (folder: string) => {
    setSelectedFolder(folder);
    if (folder === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: folder });
    }
  };

  // Lightbox controls
  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header section */}
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Photography
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Snapshots from my travels, hobbies, and life moments
          </p>
        </AnimatedSection>
        
        {/* Filter buttons */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {folders.map((folder) => (
              <FilterButton
                key={folder}
                folder={folder}
                isSelected={selectedFolder === folder}
                onClick={() => handleFilterChange(folder)}
              />
            ))}
          </div>
        </AnimatedSection>
        
        {/* Photo count */}
        <AnimatedSection delay={0.2}>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            {displayedPhotos.length} photo{displayedPhotos.length !== 1 ? 's' : ''} 
            {selectedFolder !== 'All' && ` in ${selectedFolder}`}
          </p>
        </AnimatedSection>
        
        {/* Photo gallery */}
        <div 
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-0"
          style={{ columnGap: '1rem' }}
        >
          {displayedPhotos.map((photo, index) => (
            <AnimatedSection 
              key={`${selectedFolder}-${photo.id}`} 
              delay={index * 0.05}
            >
              <PhotoCard
                photo={photo}
                onOpen={openLightbox}
              />
            </AnimatedSection>
          ))}
        </div>
        
        {/* Empty state */}
        {displayedPhotos.length === 0 && (
          <AnimatedSection delay={0.3}>
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📷</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No photos found in {selectedFolder} folder.
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
      
      {/* Lightbox modal */}
      {selectedPhoto && (
        <Lightbox photo={selectedPhoto} onClose={closeLightbox} />
      )}
    </div>
  );
};

export default Photography;