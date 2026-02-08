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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Blog</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            I write about stuff.
          </p>
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
        
        {/* Article Count */}
        <AnimatedSection delay={0.2}>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} 
            {selectedFilter !== 'All' && ` tagged with ${selectedFilter}`}
          </p>
        </AnimatedSection>
        
        {/* Single column layout for articles */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {filteredArticles.map((article, index) => (
              <AnimatedSection key={`${selectedFilter}-${article.id}`} delay={index * 0.1}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md dark:hover:shadow-gray-700 transition-all duration-300 cursor-pointer hover:translate-y-[-2px]">
                    {/* Date (omitted as requested since blog dates not available) */}
                    
                    {/* Title */}
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex items-center gap-2">
                      {article.title}
                      <ExternalLink className="h-5 w-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </h2>
                    
                    {/* Tag */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                        {article.tag}
                      </span>
                    </div>
                    
                    {/* Summary */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {article.summary}
                    </p>
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