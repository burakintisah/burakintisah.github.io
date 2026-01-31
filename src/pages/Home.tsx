import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import { Download, ExternalLink, Github, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
  // Featured projects data
  const featuredProjects = [
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
  ];

  // Featured blog posts data
  const featuredBlogPosts = [
    {
      id: 1,
      title: 'TDD and BDD: Different Focuses, Same Goal — High-Quality Software',
      url: 'https://medium.com/@burak.intisah/tdd-and-bdd-different-focuses-same-goal-high-quality-software-7ef529f9d3dc',
      summary: 'Choosing between test-driven development and behavior-driven development—with histories, pros/cons, key differences, and best practices—helps teams deliver higher-quality software.',
      tag: 'Software Development',
    },
    {
      id: 2,
      title: 'What Is Optimistic Nihilism?',
      url: 'https://medium.com/@burak.intisah/what-is-optimistic-nihilism-600c4abaa999',
      summary: 'An introduction to optimistic nihilism, explaining how embracing life\'s impermanence can reduce stress, foster freedom, and still allow us to find joy and purpose.',
      tag: 'Philosophy',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
        {/* Background Images - Tech/Coding themed without people */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 dark:hidden"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80")',
            opacity: 0.08
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center z-0 hidden dark:block"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80")',
            opacity: 0.12
          }}
        />
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-center max-w-6xl mx-auto min-h-[calc(100vh-8rem)] lg:min-h-0 py-8 lg:py-0">
            {/* Left side - Profile Picture */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center lg:justify-end items-center"
            >
              <div className="relative">
                {/* Decorative rings */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 opacity-20 animate-pulse"></div>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 opacity-30"></div>
                
                {/* Profile picture */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
                  <img 
                    src="/profile.png" 
                    alt="Osman Burak İntişah" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right side - Introduction */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-center lg:text-left space-y-6 lg:space-y-8 flex flex-col justify-center"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
                  👋 Hello, I'm
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                  Osman Burak
                </span>
                <br />
                <span className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                  İntişah
                </span>
              </motion.h1>

              {/* Introduction Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4 lg:space-y-6"
              >
                <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                  I'm a{' '}
                  <span className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                    Bilkent University graduate
                  </span>{' '}
                  and{' '}
                  <span className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                    backend engineer
                  </span>{' '}
                  at Cherry Technologies.
                </p>
                
                <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                  I'm passionate about building{' '}
                  <span className="font-semibold text-gray-900 dark:text-white italic">
                    highly scalable systems
                  </span>{' '}
                  — from APIs and databases to full backend infrastructures.
                </p>
                
                <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                  Occasionally, I{' '}
                  <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    write and share thoughts
                  </span>{' '}
                  on what I'm learning or building.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="pt-2 lg:pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button 
                  to="/about" 
                  variant="primary" 
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Button>
                
                <Button 
                  to="/connect" 
                  variant="secondary" 
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Let's Connect</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator - Mouse Icon */}
        <motion.div 
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            {/* Mouse Icon */}
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center pt-2 mb-2 hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
              <motion.div 
                className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            {/* Scroll Text */}
            <motion.span 
              className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll
            </motion.span>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Preview Sections */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg dark:hover:shadow-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:translate-y-[-4px] h-full flex flex-col group"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-gray-400 dark:text-gray-500 text-4xl">📁</div>
                      </div>
                    )}
                  </div>
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
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow leading-relaxed">{project.description}</p>
                    
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
              ))}
            </div>
            <div className="text-center mt-8">
              <Button to="/projects" variant="secondary">See All Projects</Button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Latest Blog Posts</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {featuredBlogPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md dark:hover:shadow-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex items-center gap-2">
                      {post.title}
                      <ExternalLink className="h-5 w-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                        {post.tag}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button to="/blog" variant="secondary">Read All Posts</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;