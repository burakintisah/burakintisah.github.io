import React, { useState, useMemo } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

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
    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
      {project.imageUrl && !imageError ? (
        <>
          {/* Loading skeleton with better animation */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-400 dark:text-gray-500 text-sm font-medium">Loading image...</div>
              </div>
            </div>
          )}
          
          {/* Actual image with better loading attributes */}
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{ 
              imageRendering: 'auto',
              // Add a slight blur while loading for better perceived performance
              filter: imageLoaded ? 'none' : 'blur(5px)'
            }}
          />
        </>
      ) : (
        // Fallback for missing or failed images
        <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="text-gray-400 dark:text-gray-500 text-4xl mb-2">📁</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              {imageError ? 'Failed to load' : 'No image'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const projects: Project[] = [
    {
      id: 1,
      title: 'URL Shortener',
      description: 'A secure, serverless URL-shortening backend on AWS using Lambda, API Gateway, DynamoDB, Cognito, and CloudWatch.',
      tags: ['AWS'],
      imageUrl: '/projects/photos/url-shortener.png',
      githubUrl: 'https://github.com/burakintisah/url-shortener',
    },
    {
      id: 2,
      title: 'FlowerGarden',
      description: 'A full-stack online flower shop with a React frontend and SQL-based backend supporting browsing, cart, and checkout.',
      tags: ['React', 'SQL', 'Node.js'],
      imageUrl: '/projects/photos/flowergarden.png',
      githubUrl: 'https://github.com/burakintisah/flowergarden',
      liveUrl: 'https://burakintisah.github.io/FlowerGarden/',
    },
    {
      id: 3,
      title: 'Prelude',
      description: 'A computer-vision prototype that uses YOLOv4 to detect fabric defects with a Python/Kivy interface for image input and report generation.',
      tags: ['Python'],
      imageUrl: '/projects/photos/prelude.png',
    },
    {
      id: 5,
      title: 'Fast Denouncement',
      description: 'An Android app in Java using Google Maps for anonymous GPS-based reporting, backed by a Node.js server, which won 1st place at the Bilkent hackathon.',
      tags: ['Android', 'Java', 'Node.js'],
      imageUrl: '/projects/photos/bilkent-2018-hackathon.png',
      liveUrl: 'http://bilnews.bilkent.edu.tr/cs-students-win-mobile-application-marathon/',
    },
    {
      id: 6,
      title: 'Dark Room',
      description: 'An Android puzzle game in Java that uses audio and vibration clues to escape, which won 1st place at the national BTK game marathon.',
      tags: ['Android', 'Java'],
      imageUrl: '/projects/photos/btk-2018-hackathon.png',
      liveUrl: 'https://www.btk.gov.tr/haberler/btk-oyun-maratonu-tamamlandi',
    },
  ];

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') {
      return projects;
    }
    return projects.filter(project => project.tags.includes(selectedFilter));
  }, [projects, selectedFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Projects</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"></p>
        </AnimatedSection>
        
        {/* Filter Buttons */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedFilter === tag
                    ? 'bg-primary-600 text-white dark:bg-primary-500 shadow-lg'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Project Count */}
        <AnimatedSection delay={0.2}>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} 
            {selectedFilter !== 'All' && ` with ${selectedFilter}`}
          </p>
        </AnimatedSection>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={`${selectedFilter}-${project.id}`} delay={index * 0.1}>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg dark:hover:shadow-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:translate-y-[-4px] h-full flex flex-col">
                {/* Project Image */}
                <ProjectImage project={project} />
                
                {/* Project Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow leading-relaxed whitespace-pre-line">{project.description}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-500 dark:hover:border-primary-500 transition-all duration-200 text-sm"
                      >
                        <Github className="h-4 w-4" />
                        View on GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-500 dark:hover:border-primary-500 transition-all duration-200 text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Website
                      </a>
                    )}
                    {!project.githubUrl && !project.liveUrl && (
                      <div className="text-gray-500 dark:text-gray-400 text-sm italic">
                        Repository private
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