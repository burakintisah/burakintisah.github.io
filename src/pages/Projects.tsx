import React, { useState, useMemo } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { getWebpUrl } from '../utils/photoLoader';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

// Image component with loading states and optimization
const ProjectImage: React.FC<{ project: Project }> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
      {project.imageUrl && !imageError ? (
        <>
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            </div>
          )}

          {/* Actual image */}
          <picture>
            {project.imageUrl && getWebpUrl(project.imageUrl) && (
              <source srcSet={getWebpUrl(project.imageUrl)} type="image/webp" />
            )}
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              style={{
                imageRendering: 'auto',
                filter: imageLoaded ? 'none' : 'blur(5px)'
              }}
            />
          </picture>
        </>
      ) : (
        // Fallback for missing or failed images
        <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div className="text-center">
            <div className="text-gray-300 dark:text-gray-600 text-4xl mb-2">📁</div>
            <div className="text-gray-400 dark:text-gray-500 text-xs">
              {imageError ? 'Failed to load' : 'No image'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Party Games',
    description: 'Multiplayer browser games you can play with friends. Real-time interaction and fun — built for group entertainment!',
    tags: ['React', 'Multiplayer', 'Real-time'],
    imageUrl: '/projects/photos/party-games.png',
    liveUrl: 'https://games.burakintisah.com',
  },
  {
    id: 2,
    title: 'URL Shortener',
    description: 'A secure, serverless URL-shortening backend on AWS using Lambda, API Gateway, DynamoDB, Cognito, and CloudWatch.',
    tags: ['AWS'],
    imageUrl: '/projects/photos/url-shortener.png',
    githubUrl: 'https://github.com/burakintisah/url-shortener',
  },
  {
    id: 3,
    title: 'FlowerGarden',
    description: 'A full-stack online flower shop with a React frontend and SQL-based backend supporting browsing, cart, and checkout.',
    tags: ['React', 'SQL', 'Node.js'],
    imageUrl: '/projects/photos/flowergarden.jpg',
    githubUrl: 'https://github.com/burakintisah/flowergarden',
    liveUrl: 'https://burakintisah.github.io/FlowerGarden/',
  },
  {
    id: 4,
    title: 'Prelude',
    description: 'A computer-vision prototype that uses YOLOv4 to detect fabric defects with a Python/Kivy interface for image input and report generation.',
    tags: ['Python'],
    imageUrl: '/projects/photos/prelude.jpg',
  },
  {
    id: 5,
    title: 'Fast Denouncement',
    description: 'An Android app in Java using Google Maps for anonymous GPS-based reporting, backed by a Node.js server, which won 1st place at the Bilkent hackathon.',
    tags: ['Android', 'Java', 'Node.js'],
    imageUrl: '/projects/photos/bilkent-2018-hackathon.jpg',
    liveUrl: 'http://bilnews.bilkent.edu.tr/cs-students-win-mobile-application-marathon/',
  },
  {
    id: 6,
    title: 'Dark Room',
    description: 'An Android puzzle game in Java that uses audio and vibration clues to escape, which won 1st place at the national BTK game marathon.',
    tags: ['Android', 'Java'],
    imageUrl: '/projects/photos/btk-2018-hackathon.jpg',
    liveUrl: 'https://www.btk.gov.tr/haberler/btk-oyun-maratonu-tamamlandi',
  },
];

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') {
      return projects;
    }
    return projects.filter(project => project.tags.includes(selectedFilter));
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Projects</h1>
          </div>
        </AnimatedSection>

        {/* Filter Buttons */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedFilter === tag
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                    : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Project Count */}
        <AnimatedSection delay={0.2}>
          <p className="text-center text-sm text-gray-500 dark:text-gray-500 mb-8">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {selectedFilter !== 'All' && ` with ${selectedFilter}`}
          </p>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={`${selectedFilter}-${project.id}`} delay={index * 0.1}>
              <div className="card-accent bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group">
                {/* Project Image */}
                <ProjectImage project={project} />

                {/* Project Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 flex-grow leading-relaxed whitespace-pre-line">{project.description}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all duration-200"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all duration-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live
                      </a>
                    )}
                    {!project.githubUrl && !project.liveUrl && (
                      <div className="text-gray-400 dark:text-gray-500 text-sm">
                        Private
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <AnimatedSection delay={0.3}>
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No projects found with {selectedFilter} technology.
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default Projects;
