// Photo loader utility for dynamic photo loading
// This file helps automatically discover photos in the public/photos directory

import type { PhotoManifestType } from '../data/photoManifest';

export interface Photo {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
  folder: string;
  filename: string;
  tags: string[];
}

// Common image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Helper function to check if a file is an image
export const isImageFile = (filename: string): boolean => {
  return IMAGE_EXTENSIONS.some(ext =>
    filename.toLowerCase().endsWith(ext)
  );
};

// Helper function to generate alt text from filename
export const generateAltText = (filename: string, folder: string): string => {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  // Remove trailing numbers (e.g., "-1", "_2", " 3") and clean up separators
  const cleanName = nameWithoutExt
    .replace(/[-_]\d+$/, '') // Remove trailing dash/underscore + numbers
    .replace(/\s+\d+$/, '') // Remove trailing space + numbers
    .replace(/[_-]/g, ' '); // Replace remaining underscores/dashes with spaces
  return `${folder} - ${cleanName}`;
};

// Helper function to capitalize folder names
export const capitalizeFolder = (folder: string): string => {
  return folder.charAt(0).toUpperCase() + folder.slice(1);
};

// Function to attempt loading an image and get its dimensions
export const loadImageDimensions = (url: string): Promise<{width: number, height: number}> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      // Default dimensions if image fails to load
      resolve({ width: 1200, height: 800 });
    };
    img.src = url;
  });
};

// Helper to get WebP URL from original image URL
export const getWebpUrl = (url: string): string => {
  // istanbul-trendyol-campus-outside has no WebP (it was larger)
  if (url.includes('istanbul-trendyol-campus-outside')) return '';
  return url.replace(/\.(jpe?g|png)$/i, '.webp');
};

// Main function to dynamically load photos from tag-based manifest
export const createPhotoManifest = (photoFiles: PhotoManifestType): Photo[] => {
  const photos: Photo[] = [];
  let idCounter = 1;

  Object.entries(photoFiles).forEach(([folder, entries]) => {
    entries.forEach(entry => {
      if (isImageFile(entry.filename)) {
        photos.push({
          id: idCounter++,
          url: `/photos/${folder}/${entry.filename}`,
          alt: generateAltText(entry.filename, capitalizeFolder(folder)),
          width: 1200, // Default width - will be updated when image loads
          height: 800, // Default height - will be updated when image loads
          folder: capitalizeFolder(folder),
          filename: entry.filename,
          tags: entry.tags,
        });
      }
    });
  });

  return photos;
};

// Collect all unique tags from photos
export const collectAllTags = (photos: Photo[]): string[] => {
  const tagSet = new Set<string>();
  photos.forEach(photo => {
    photo.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};
