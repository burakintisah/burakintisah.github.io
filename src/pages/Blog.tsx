import React, { useState, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { ExternalLink } from 'lucide-react';

interface BlogArticle {
  id: number;
  title: string;
  url: string;
  summary: string;
  tag: string;
  date?: string;
}

const blogArticles: BlogArticle[] = [
  {
    id: 4,
    title: 'I Was Using Claude Code All Wrong: From Chatbot to Autonomous Engineering Team',
    url: 'https://medium.com/@burak.intisah/i-was-using-claude-code-all-wrong-from-chatbot-to-autonomous-engineering-team-61bfb2e9575c',
    summary: 'My journey from using AI as a simple chatbot to building an autonomous engineering workflow—discover how Claude Code transformed my development process with real-world examples and practical insights.',
    tag: 'AI & Development',
  },
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
  {
    id: 3,
    title: 'What Is Rhetoric? How to Improve Your Rhetorical Skills?',
    url: 'https://medium.com/@burak.intisah/what-is-rhetoric-how-to-improve-your-rhetorical-skills-89f42e0b4ee4',
    summary: 'A concise guide to the art of persuasion—covering ethos, logos, pathos, common rhetorical devices, and practical tips to hone your writing and speaking.',
    tag: 'Communication',
  },
];

const Blog: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Get all unique tags from articles
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogArticles.forEach(article => {
      tags.add(article.tag);
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);

  // Filter articles based on selected filter
  const filteredArticles = useMemo(() => {
    if (selectedFilter === 'All') {
      return blogArticles;
    }
    return blogArticles.filter(article => article.tag === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Writing</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I write about stuff.
            </p>
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

        {/* Article Count */}
        <AnimatedSection delay={0.2}>
          <p className="text-center text-sm text-gray-500 dark:text-gray-500 mb-8">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            {selectedFilter !== 'All' && ` tagged with ${selectedFilter}`}
          </p>
        </AnimatedSection>

        {/* Single column layout for articles */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredArticles.map((article, index) => (
              <AnimatedSection key={`${selectedFilter}-${article.id}`} delay={index * 0.1}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-3">
                          <span className="inline-block px-2.5 py-0.5 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                            {article.tag}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
                          {article.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <AnimatedSection delay={0.3}>
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No articles found with {selectedFilter} tag.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
