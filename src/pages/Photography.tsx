import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { createPhotoManifest, Photo, getWebpUrl } from '../utils/photoLoader';
import { PHOTO_MANIFEST } from '../data/photoManifest';

// Photo card component - displays image only, no names or tags
const PhotoCard: React.FC<{
  photo: Photo;
}> = ({ photo }) => {
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

  const calculateHeight = () => {
    if (!imageDimensions) return 300;

    const aspectRatio = imageDimensions.height / imageDimensions.width;
    const baseWidth = 300;
    const calculatedHeight = baseWidth * aspectRatio;

    return Math.min(Math.max(calculatedHeight, 200), 400);
  };

  const cardHeight = imageLoaded ? calculateHeight() : 300;

  return (
    <div
      className="relative overflow-hidden rounded-xl group break-inside-avoid mb-4 transition-all duration-300 hover:shadow-card-hover"
      style={{ height: `${cardHeight}px` }}
    >
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-xl">
          <div className="text-center">
            <div className="text-gray-300 dark:text-gray-600 text-4xl mb-2">📷</div>
            <div className="text-gray-400 dark:text-gray-500 text-xs">
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
    </div>
  );
};

// Category filter button component
const CategoryButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
      isSelected
        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
        : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
    }`}
  >
    {label}
  </button>
);

// Display labels for each folder category
const CATEGORY_LABELS: Record<string, string> = {
  cherry: 'Cherry',
  trendyol: 'Trendyol',
  japan: 'Japan',
  korea: 'Korea',
  USA: 'USA',
};

// Main Photography component
const Photography: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read active filter from URL (?filter=Cherry)
  const activeFilter = searchParams.get('filter') ?? '';

  // Generate photos from manifest
  const photos: Photo[] = useMemo(() => {
    return createPhotoManifest(PHOTO_MANIFEST);
  }, []);

  // Derive available categories from manifest folder keys
  const categories = useMemo(() => {
    return Object.keys(PHOTO_MANIFEST).map(folder => ({
      key: folder,
      label: CATEGORY_LABELS[folder] ?? folder,
    }));
  }, []);

  // Set filter
  const handleFilterSelect = useCallback((label: string) => {
    if (label === activeFilter) {
      // Deselect
      setSearchParams({});
    } else {
      setSearchParams({ filter: label });
    }
  }, [activeFilter, setSearchParams]);

  // Clear filter
  const clearFilter = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  // Filter photos by selected category (match folder name, case-insensitive)
  const displayedPhotos = useMemo(() => {
    if (!activeFilter) {
      // Shuffle when showing all
      return [...photos].sort(() => Math.random() - 0.5);
    }

    return photos.filter(photo =>
      photo.folder.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [photos, activeFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        {/* Header section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Gallery</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              Photography
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Snapshots from my travels, hobbies, and life moments
            </p>
          </div>
        </AnimatedSection>

        {/* Category filter buttons */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(({ key, label }) => (
              <CategoryButton
                key={key}
                label={label}
                isSelected={activeFilter.toLowerCase() === label.toLowerCase()}
                onClick={() => handleFilterSelect(label)}
              />
            ))}
            {activeFilter && (
              <button
                onClick={clearFilter}
                className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors underline"
              >
                Clear
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Photo gallery */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-0"
          style={{ columnGap: '1rem' }}
        >
          {displayedPhotos.map((photo, index) => (
            <AnimatedSection
              key={`${activeFilter}-${photo.id}`}
              delay={index * 0.05}
            >
              <PhotoCard photo={photo} />
            </AnimatedSection>
          ))}
        </div>

        {/* Empty state */}
        {displayedPhotos.length === 0 && (
          <AnimatedSection delay={0.3}>
            <div className="text-center py-16">
              <div className="text-gray-300 dark:text-gray-600 text-6xl mb-4">📷</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                No photos found for this category
              </p>
              <button
                onClick={clearFilter}
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Show all photos
              </button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default Photography;
