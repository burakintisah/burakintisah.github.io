import React, { useState, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { BookOpen, ExternalLink, Tag, X, Heart } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  author: string;
  source: string;
  url: string;
  likedDate: string;
  excerpt: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: 6,
    title: 'Claude Code: Best Practices for Agentic Coding',
    author: 'Anthropic Engineering',
    source: 'anthropic.com',
    url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
    likedDate: '2026-02-20',
    excerpt: 'A comprehensive guide on how to get the most out of Claude Code — from the explore-plan-code-commit workflow and CLAUDE.md files to multi-agent patterns and treating Claude like a junior engineer with tools, memory, and iteration.',
    tags: ['AI', 'Developer Tools', 'Best Practices']
  },
  {
    id: 7,
    title: 'Making Claude Code More Secure and Autonomous',
    author: 'Anthropic Engineering',
    source: 'anthropic.com',
    url: 'https://www.anthropic.com/engineering/claude-code-sandboxing',
    likedDate: '2026-02-20',
    excerpt: 'How Claude Code\'s new sandboxing features reduce permission prompts by 84% while increasing user safety through filesystem and network isolation, enabling more autonomous agentic workflows.',
    tags: ['AI', 'Security', 'Developer Tools']
  },
  {
    id: 1,
    title: 'Building Resilient Systems with Circuit Breakers',
    author: 'Martin Fowler',
    source: 'martinfowler.com',
    url: 'https://martinfowler.com/bliki/CircuitBreaker.html',
    likedDate: '2025-06-01',
    excerpt: 'The basic idea behind the circuit breaker is very simple. You wrap a protected function call in a circuit breaker object, which monitors for failures...',
    tags: ['System Design', 'Patterns']
  },
  {
    id: 2,
    title: 'Microservices: A Definition of This New Architectural Term',
    author: 'James Lewis & Martin Fowler',
    source: 'martinfowler.com',
    url: 'https://martinfowler.com/articles/microservices.html',
    likedDate: '2025-06-01',
    excerpt: 'The term "Microservice Architecture" has sprung up over the last few years to describe a particular way of designing software applications as suites of independently deployable services...',
    tags: ['Microservices', 'Architecture']
  },
  {
    id: 3,
    title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure',
    author: 'Robert C. Martin',
    source: 'blog.cleancoder.com',
    url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html',
    likedDate: '2025-06-01',
    excerpt: 'Over the last several years we\'ve seen a whole range of ideas regarding the architecture of systems. These include: Hexagonal Architecture, Onion Architecture, Screaming Architecture...',
    tags: ['Clean Code', 'Architecture']
  },
  {
    id: 4,
    title: 'Event Sourcing: Capturing All Changes to an Application State',
    author: 'Greg Young',
    source: 'eventstore.com',
    url: 'https://eventstore.com/blog/what-is-event-sourcing',
    likedDate: '2025-06-01',
    excerpt: 'Event Sourcing ensures that all changes to application state are stored as a sequence of events. Not just can we query these events, we can also use the event log to reconstruct past states...',
    tags: ['Event Sourcing', 'Architecture']
  },
  {
    id: 5,
    title: 'The Twelve-Factor App',
    author: 'Adam Wiggins',
    source: '12factor.net',
    url: 'https://12factor.net/',
    likedDate: '2024-05-23',
    excerpt: 'A methodology for building software-as-a-service apps that use declarative formats for setup automation, have a clean contract with the underlying operating system...',
    tags: ['DevOps', 'Best Practices']
  },
];

const ReadingList: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(article => article.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const filteredAndSortedArticles = useMemo(() => {
    const filtered = articles.filter(article => {
      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => article.tags.includes(tag));
      const searchMatch = searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return tagMatch && searchMatch;
    });

    // Sort by liked date (most recent first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.likedDate);
      const dateB = new Date(b.likedDate);
      return dateB.getTime() - dateA.getTime();
    });

    return filtered;
  }, [selectedTags, searchQuery]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedTags.length > 0 || searchQuery !== '';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Curated</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Reading List</h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Articles and resources I've found valuable and worth sharing
            </p>
          </div>
        </AnimatedSection>

        {/* Filters and Search */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200/80 dark:border-gray-700/50">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, authors, or sources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Tag Filter */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Filter by Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters & Clear */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/80 dark:border-gray-700/50">
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    Showing {filteredAndSortedArticles.length} of {articles.length} articles
                  </div>
                  <button
                    onClick={clearFilters}
                    className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Articles List */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredAndSortedArticles.map((article, index) => (
              <AnimatedSection key={article.id} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-200/80 dark:border-gray-700/50 hover:-translate-y-0.5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
                          {article.title}
                        </h2>
                      </a>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <span className="font-medium">{article.author}</span>
                        <span className="mx-2">·</span>
                        <span>{article.source}</span>
                      </div>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950/30"
                      aria-label={`Read ${article.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                        onClick={() => toggleTag(tag)}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Liked Date */}
                  <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                    <Heart className="h-3 w-3 mr-1.5 text-red-400 fill-current" />
                    <span>Liked on {formatDate(article.likedDate)}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filteredAndSortedArticles.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Try adjusting your filters or search terms.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Curated Note */}
          <AnimatedSection delay={0.8} className="mt-16">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 border-l-[3px] border-l-primary-500 border border-gray-200/80 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white tracking-tight">Curated with Care</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                This reading list is manually curated with articles, papers, and resources that I've found genuinely valuable.
                Each piece is selected for its insights, practical value, or thought-provoking ideas.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Have a suggestion for an article that should be here? Feel free to reach out and share it with me.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default ReadingList;
