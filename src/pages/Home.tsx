import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import { getWebpUrl } from '../utils/photoLoader';
import { ExternalLink, Github, MessageCircle, ArrowRight } from 'lucide-react';

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
      imageUrl: '/projects/photos/flowergarden.jpg',
      githubUrl: 'https://github.com/burakintisah/flowergarden',
      liveUrl: 'https://burakintisah.github.io/FlowerGarden/',
    },
  ];

  // Featured blog posts data
  const featuredBlogPosts = [
    {
      id: 1,
      title: 'I Was Using Claude Code All Wrong: From Chatbot to Autonomous Engineering Team',
      url: 'https://medium.com/@burak.intisah/i-was-using-claude-code-all-wrong-from-chatbot-to-autonomous-engineering-team-61bfb2e9575c',
      summary: 'My journey from using AI as a simple chatbot to building an autonomous engineering workflow—discover how Claude Code transformed my development process with real-world examples and practical insights.',
      tag: 'AI & Development',
    },
    {
      id: 2,
      title: 'TDD and BDD: Different Focuses, Same Goal — High-Quality Software',
      url: 'https://medium.com/@burak.intisah/tdd-and-bdd-different-focuses-same-goal-high-quality-software-7ef529f9d3dc',
      summary: 'Choosing between test-driven development and behavior-driven development—with histories, pros/cons, key differences, and best practices—helps teams deliver higher-quality software.',
      tag: 'Software Development',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 pt-16 overflow-hidden">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 bg-grid-pattern z-0" />

        {/* Soft gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl z-0" />

        <div className="container mx-auto px-4 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-center max-w-6xl mx-auto min-h-[calc(100vh-8rem)] lg:min-h-0 py-8 lg:py-0">
            {/* Left side - Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center lg:justify-end items-center"
            >
              <div className="relative">
                {/* Gradient ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-400 via-primary-500 to-purple-500 opacity-30 blur-sm"></div>

                {/* Profile picture */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-[3px] border-white dark:border-gray-800 shadow-elevated">
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-center lg:text-left space-y-6 lg:space-y-8 flex flex-col justify-center"
            >
              {/* Greeting badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-100 dark:border-primary-900/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Backend Engineer
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight"
              >
                <span className="text-gray-900 dark:text-white">
                  Osman Burak
                </span>
                <br />
                <span className="text-gradient-primary">
                  İntişah
                </span>
              </motion.h1>

              {/* Introduction Text */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-4"
              >
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                  Bilkent University graduate and backend engineer at Cherry Technologies.
                  I build highly scalable systems — from APIs and databases to full backend infrastructures.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Button
                  to="/about"
                  variant="primary"
                  size="lg"
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>

                <Button
                  to="/connect"
                  variant="outline"
                  size="lg"
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Let's Connect
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <div className="w-5 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center pt-1.5 group-hover:border-primary-400 dark:group-hover:border-primary-500 transition-colors">
              <motion.div
                className="w-1 h-2.5 bg-gray-300 dark:bg-gray-600 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="py-20 md:py-28 bg-gray-50/50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="mb-16">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Portfolio</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Recent Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="card-accent bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group"
                >
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                    {project.imageUrl ? (
                      <picture>
                        {getWebpUrl(project.imageUrl) && (
                          <source srcSet={getWebpUrl(project.imageUrl)} type="image/webp" />
                        )}
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </picture>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-gray-400 dark:text-gray-500 text-4xl">📁</div>
                      </div>
                    )}
                  </div>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 flex-grow leading-relaxed">{project.description}</p>

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
              ))}
            </div>
            <div className="text-center mt-10">
              <Button to="/projects" variant="outline" className="border-gray-300 dark:border-gray-700">
                <span className="flex items-center gap-2">
                  See All Projects
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </div>
          </AnimatedSection>

          {/* Section divider */}
          <div className="section-divider max-w-lg mx-auto my-8" />

          <AnimatedSection delay={0.2}>
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Writing</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Latest Blog Posts</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {featuredBlogPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-3">
                          <span className="inline-block px-2.5 py-0.5 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                            {post.tag}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button to="/blog" variant="outline" className="border-gray-300 dark:border-gray-700">
                <span className="flex items-center gap-2">
                  Read All Posts
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
