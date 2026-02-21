import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import { getWebpUrl } from '../utils/photoLoader';
import { ExternalLink, Github, MessageCircle, ArrowRight, Terminal, Code2 } from 'lucide-react';

// Typing animation hook
const useTypingEffect = (texts: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

// Featured projects data (module-level)
const featuredProjects = [
  {
    id: 1,
    title: 'Party Games',
    description: 'Multiplayer browser games you can play with friends. Real-time interaction and fun — built for group entertainment!',
    tags: ['Games', 'Real-time'],
    imageUrl: '/projects/photos/party-games.svg',
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
];

// Featured blog posts data (module-level)
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

// Tech stack items (module-level)
const techStack = [
  { name: 'Java', category: 'Languages' },
  { name: 'Kotlin', category: 'Languages' },
  { name: 'Go', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'Spring Boot', category: 'Frameworks' },
  { name: 'PostgreSQL', category: 'Data' },
  { name: 'Redis', category: 'Data' },
  { name: 'Kafka', category: 'Data' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Elasticsearch', category: 'Data' },
  { name: 'RabbitMQ', category: 'Data' },
];

const Home: React.FC = () => {
  const typedText = useTypingEffect([
    'backend systems',
    'scalable APIs',
    'distributed architectures',
    'payment infrastructures',
    'event-driven systems',
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Terminal Inspired */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-hero opacity-40 dark:opacity-20" />

        <div className="container mx-auto px-4 z-10 w-full">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center py-8 lg:py-0">
              {/* Left side - Terminal Card (3 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-3 order-2 lg:order-1"
              >
                {/* Terminal Window - always dark themed */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-700/50 bg-gray-900 shadow-elevated dark:shadow-2xl overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-800/80">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500 font-mono">burak@portfolio ~ %</span>
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-6 font-mono text-sm space-y-3">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-emerald-400">$</span>
                      <span className="text-gray-400"> cat</span>
                      <span className="text-primary-400"> about.json</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-gray-300 pl-2 space-y-1"
                    >
                      <div className="text-gray-500">{'{'}</div>
                      <div className="pl-4">
                        <span className="text-primary-300">"name"</span>
                        <span className="text-gray-500">: </span>
                        <span className="text-emerald-300">"Osman Burak Intisah"</span>
                        <span className="text-gray-500">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-primary-300">"role"</span>
                        <span className="text-gray-500">: </span>
                        <span className="text-emerald-300">"Backend Engineer"</span>
                        <span className="text-gray-500">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-primary-300">"company"</span>
                        <span className="text-gray-500">: </span>
                        <span className="text-emerald-300">"Cherry Technologies"</span>
                        <span className="text-gray-500">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-primary-300">"education"</span>
                        <span className="text-gray-500">: </span>
                        <span className="text-emerald-300">"Bilkent University - CS"</span>
                        <span className="text-gray-500">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-primary-300">"building"</span>
                        <span className="text-gray-500">: </span>
                        <span className="text-yellow-300">"<span className="inline-block min-w-[1ch]">{typedText}</span><span className="animate-blink text-primary-400">|</span>"</span>
                      </div>
                      <div className="text-gray-500">{'}'}</div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="pt-2"
                    >
                      <span className="text-emerald-400">$</span>
                      <span className="text-gray-500"> _</span>
                    </motion.div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="mt-6 flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    to="/about"
                    variant="primary"
                    size="lg"
                    className="bg-gray-900 dark:bg-primary-600 hover:bg-gray-800 dark:hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <Terminal className="h-4 w-4" />
                      Explore More
                    </span>
                  </Button>

                  <Button
                    to="/connect"
                    variant="outline"
                    size="lg"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Let's Connect
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right side - Profile + Info (2 cols) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="lg:col-span-2 flex flex-col items-center order-1 lg:order-2"
              >
                {/* Profile picture */}
                <div className="relative mb-6">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-400 via-emerald-400 to-primary-400 dark:from-primary-500 dark:via-emerald-500 dark:to-primary-500 opacity-30 dark:opacity-40 blur-sm animate-float" />
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-elevated dark:shadow-2xl">
                    <img
                      src="/profile.png"
                      alt="Osman Burak İntişah"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                </div>

                {/* Name and title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Burak Intisah
                  </h1>
                  <p className="mt-1 text-primary-600 dark:text-primary-400 font-medium text-sm">
                    Backend Engineer
                  </p>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                    Building highly scalable systems — from APIs and databases to full backend infrastructures.
                  </p>
                </motion.div>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 grid grid-cols-3 gap-4 w-full max-w-xs"
                >
                  {[
                    { label: 'Experience', value: '5+ yrs' },
                    { label: 'Company', value: 'Cherry' },
                    { label: 'Degree', value: 'CS, BSc' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-lg bg-white/80 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/30 shadow-card dark:shadow-none">
                      <div className="text-gray-900 dark:text-white font-semibold text-sm">{stat.value}</div>
                      <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <div className="w-5 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center pt-1.5 group-hover:border-primary-400 transition-colors">
              <motion.div
                className="w-1 h-2.5 bg-gray-300 dark:bg-gray-600 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-100/70 dark:bg-gray-800/30 border-t border-gray-200/60 dark:border-gray-700/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-2">Tech Stack</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Tools I Work With</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-primary-400 dark:hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-200 cursor-default shadow-card dark:shadow-none"
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
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
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-500/10 to-emerald-500/10">
                        <Code2 className="h-12 w-12 text-gray-400 dark:text-gray-500" />
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
