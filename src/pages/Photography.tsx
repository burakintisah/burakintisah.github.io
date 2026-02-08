import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { createPhotoManifest, collectAllTags, Photo, getWebpUrl } from '../utils/photoLoader';
import { PHOTO_MANIFEST } from '../data/photoManifest';

// Photo card component with optimized loading and responsive design
const PhotoCard: React.FC<{
  photo: Photo;
  onOpen: (photo: Photo) => void;
  onTagClick: (tag: string) => void;
}> = ({ photo, onOpen, onTagClick }) => {
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
        <picture>
          {getWebpUrl(photo.url) && (
            <source srcSet={getWebpUrl(photo.url)} type="image/webp" />
          )}
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
        </picture>
      )}

      {/* Hover overlay */}
      {imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
          <div className="w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-wrap gap-1">
              {photo.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick(tag);
                  }}
                  className="bg-black bg-opacity-60 text-white px-2 py-0.5 rounded text-xs font-medium hover:bg-primary-600 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
              {photo.tags.length > 3 && (
                <span className="bg-black bg-opacity-60 text-white px-2 py-0.5 rounded text-xs font-medium">
                  +{photo.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tag badges (always visible) */}
      {imageLoaded && !imageError && (
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[80%]">
          {photo.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-black bg-opacity-50 text-white px-2 py-0.5 rounded text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Tag filter button component
const TagButton: React.FC<{
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ tag, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
      isSelected
        ? 'bg-primary-600 text-white dark:bg-primary-500 shadow-lg transform scale-105'
        : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-105'
    }`}
  >
    {tag}
  </button>
);

// Lightbox component for better organization
const Lightbox: React.FC<{
  photo: Photo;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}> = ({ photo, onClose, onTagClick }) => (
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
      <picture>
        {getWebpUrl(photo.url) && (
          <source srcSet={getWebpUrl(photo.url)} type="image/webp" />
        )}
        <img
          src={photo.url}
          alt={photo.alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
      </picture>
      <div className="text-white text-center mt-4">
        <p className="text-lg font-medium">{photo.alt}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {photo.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                onClose();
                onTagClick(tag);
              }}
              className="bg-white bg-opacity-20 hover:bg-primary-600 text-white px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Main Photography component
const Photography: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Generate photos from manifest
  const photos: Photo[] = useMemo(() => {
    return createPhotoManifest(PHOTO_MANIFEST);
  }, []);

  // Get all unique tags
  const allTags = useMemo(() => {
    return collectAllTags(photos);
  }, [photos]);

  // Handle URL parameters for deep linking
  useEffect(() => {
    const tagsParam = searchParams.get('tags');
    if (tagsParam) {
      const urlTags = tagsParam.split(',').filter(t => allTags.includes(t));
      if (urlTags.length > 0) {
        setSelectedTags(urlTags);
      }
    }
  }, [searchParams, allTags]);

  // Handle tag toggle
  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];

      if (newTags.length === 0) {
        setSearchParams({});
      } else {
        setSearchParams({ tags: newTags.join(',') });
      }

      return newTags;
    });
  }, [setSearchParams]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedTags([]);
    setSearchParams({});
  }, [setSearchParams]);

  // Filter photos by selected tags (AND logic: photo must have ALL selected tags)
  const displayedPhotos = useMemo(() => {
    let filteredPhotos = selectedTags.length === 0
      ? photos
      : photos.filter(photo =>
          selectedTags.every(tag => photo.tags.includes(tag))
        );

    // Shuffle photos when showing all for visual variety
    if (selectedTags.length === 0) {
      filteredPhotos = [...filteredPhotos].sort(() => Math.random() - 0.5);
    }

    return filteredPhotos;
  }, [photos, selectedTags]);

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

        {/* Tag filter buttons */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {allTags.map((tag) => (
              <TagButton
                key={tag}
                tag={tag}
                isSelected={selectedTags.includes(tag)}
                onClick={() => handleTagToggle(tag)}
              />
            ))}
          </div>
          {selectedTags.length > 0 && (
            <div className="flex justify-center mt-2 mb-8">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors underline"
              >
                Clear all filters ({selectedTags.length} active)
              </button>
            </div>
          )}
        </AnimatedSection>

        {/* Photo count */}
        <AnimatedSection delay={0.2}>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            {displayedPhotos.length} photo{displayedPhotos.length !== 1 ? 's' : ''}
            {selectedTags.length > 0 && ` matching: ${selectedTags.join(' + ')}`}
          </p>
        </AnimatedSection>

        {/* Photo gallery */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-0"
          style={{ columnGap: '1rem' }}
        >
          {displayedPhotos.map((photo, index) => (
            <AnimatedSection
              key={`${selectedTags.join('-')}-${photo.id}`}
              delay={index * 0.05}
            >
              <PhotoCard
                photo={photo}
                onOpen={openLightbox}
                onTagClick={handleTagToggle}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Empty state */}
        {displayedPhotos.length === 0 && (
          <AnimatedSection delay={0.3}>
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📷</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                No photos found matching: {selectedTags.join(' + ')}
              </p>
              <button
                onClick={clearFilters}
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          </AnimatedSection>
        )}
      </div>

      {/* Lightbox modal */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          onClose={closeLightbox}
          onTagClick={handleTagToggle}
        />
      )}
    </div>
  );
};

export default Photography;
