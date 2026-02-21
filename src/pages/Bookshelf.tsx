import React, { useState, useMemo } from 'react';
import { BookOpen, Star, ExternalLink, Search, X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface Book {
  id: number;
  title: string;
  author: string;
  finishedDate: string; // When the book was finished reading (YYYY-MM-DD format)
  rating: number;
  tags: string[];
  purchaseLink: string;
  coverImage: string;
  notesUrl?: string; // Link to detailed book notes on books.burakintisah.com
}

const books: Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    finishedDate: '2021-11-11',
    rating: 5,
    tags: ['Software Engineering'],
    purchaseLink: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg'
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    finishedDate: '2025-05-05',
    rating: 5,
    tags: ['Software Engineering'],
    purchaseLink: 'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg'
  },
  {
    id: 3,
    title: 'Atomic Habits',
    author: 'James Clear',
    finishedDate: '2021-12-12',
    rating: 4,
    tags: ['Psychology', 'Productivity'],
    purchaseLink: 'https://amzn.eu/d/4N2HVVo',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg',
    notesUrl: 'https://books.burakintisah.com/books/atomic-habits'
  },
  {
    id: 4,
    title: 'System Design Interview',
    author: 'Alex Xu',
    finishedDate: '2024-12-12',
    rating: 4,
    tags: ['System Design', 'Interview'],
    purchaseLink: 'https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF',
    coverImage: 'https://m.media-amazon.com/images/I/61CekcUc2EL._SL1360_.jpg'
  },
  {
    id: 5,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    finishedDate: '2025-03-03',
    rating: 5,
    tags: ['System Design'],
    purchaseLink: 'https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415816873i/23463279.jpg',
    notesUrl: 'https://books.burakintisah.com/books/designing-data-intensive-applications'
  },
  {
    id: 6,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    finishedDate: '2025-04-04',
    rating: 4,
    tags: ['Finance', 'Psychology'],
    purchaseLink: 'https://www.amazon.com/Psychology-Money-Timeless-lessons-happiness/dp/0857197681',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg'
  },
  {
    id: 7,
    title: 'Refactoring',
    author: 'Martin Fowler',
    finishedDate: '2023-07-10',
    rating: 5,
    tags: ['System Design'],
    purchaseLink: 'https://www.amazon.com/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599',
    coverImage: 'https://martinfowler.com/books/refact2.jpg'
  },
  {
    "id": 8,
    "title": "Feel Good Productivity",
    "author": "Ali Abdaal",
    "finishedDate": "2025-06-05",
    "rating": 4,
    "tags": ["Productivity"],
    "purchaseLink": "https://amzn.eu/d/c39PDT1",
    "coverImage": "https://m.media-amazon.com/images/I/71GcwzanFpL._SL1500_.jpg"
  },
  {
    "id": 9,
    "title": "Safsatalar Ansiklopedisi: Akıl Yürüt(eme)menin Kısa Tarih",
    "author": "Immanuel Tolstoyevski",
    "finishedDate": "2023-06-15",
    "rating": 4,
    "tags": ["Philosophy"],
    "purchaseLink": "https://amzn.eu/d/1uvZqgd",
    "coverImage": "https://m.media-amazon.com/images/I/51rXD3zV0nL._SL1000_.jpg"
  },
  {
    "id": 10,
    "title": "Nutuk",
    "author": "Mustafa Kemal Atatürk",
    "finishedDate": "2021-05-23",
    "rating": 5,
    "tags": ["History", "Politics"],
    "purchaseLink": "https://amzn.eu/d/d44COT0",
    "coverImage": "https://m.media-amazon.com/images/I/81cpZF7r0BL._SL1500_.jpg"
  },
  {
    "id": 11,
    "title": "Domain-Driven Design: Tackling Complexity in the Heart of Software",
    "author": "Eric Evans",
    "finishedDate": "2025-04-12",
    "rating": 5,
    "tags": ["System Design"],
    "purchaseLink": "https://amzn.eu/d/1evP4wz",
    "coverImage": "https://m.media-amazon.com/images/I/81ykBjVaUjL._SL1500_.jpg"
  },
  {
    "id": 12,
    "title": "Sofi'nin Dünyası",
    "author": "Jostein Gaarder",
    "finishedDate": "2023-03-08",
    "rating": 5,
    "tags": ["Philosophy"],
    "purchaseLink": "https://amzn.eu/d/7NAFuZ0",
    "coverImage": "https://upload.wikimedia.org/wikipedia/tr/1/1e/Sofie%27nin_D%C3%BCnyas%C4%B1.jpg"
  },
  {
    id: 13,
    title: 'The Product-Minded Engineer',
    author: 'Drew Hoskins',
    finishedDate: '2026-02-15',
    rating: 5,
    tags: ['Software Engineering', 'Product'],
    purchaseLink: 'https://www.oreilly.com/library/view/the-product-minded-engineer/9781098173722/',
    coverImage: 'https://m.media-amazon.com/images/I/81YVbEj2YIL._SL1500_.jpg',
    notesUrl: 'https://book.burakintisah.com/books/the-product-minded-engineer'
  }
];

const Bookshelf: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    books.forEach(book => book.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const allYears = useMemo(() => {
    const years = new Set(books.map(book => new Date(book.finishedDate).getFullYear()));
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  const filteredBooks = useMemo(() => {
    const filtered = books.filter(book => {
      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => book.tags.includes(tag));
      const finishedYear = new Date(book.finishedDate).getFullYear();
      const yearMatch = selectedYear === 'all' || finishedYear.toString() === selectedYear;
      const searchMatch = searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return tagMatch && yearMatch && searchMatch;
    });

    // Sort by finished date (most recent first)
    filtered.sort((a, b) => new Date(b.finishedDate).getTime() - new Date(a.finishedDate).getTime());

    return filtered;
  }, [selectedTags, selectedYear, searchQuery]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-200 dark:text-gray-700'
        }`}
      />
    ));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedYear('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedYear !== 'all' || searchQuery !== '';

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Library</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              My Bookshelf
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Books that have shaped my thinking and improved my skills.
            </p>
          </div>
        </AnimatedSection>

        {/* Enhanced Filters */}
        <AnimatedSection>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-10 border border-gray-200/80 dark:border-gray-700/50">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books, authors, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Year Filter */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">
                Filter by Year Finished
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedYear('all')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedYear === 'all'
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  All Years
                </button>
                {allYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year.toString())}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedYear === year.toString()
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
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
                  Showing {filteredBooks.length} of {books.length} books
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
        </AnimatedSection>

        {/* Books Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredBooks.map((book, index) => (
            <AnimatedSection key={book.id} delay={index * 0.05}>
              <div
                className="bg-white dark:bg-gray-800/50 rounded-xl shadow-card hover:shadow-card-hover border border-gray-200/80 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 group h-full"
              >
                {/* Book Cover */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center" style={{ display: 'none' }}>
                    <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                  </div>

                  {/* Purchase Link Overlay */}
                  <a
                    href={book.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-800"
                    aria-label={`Buy ${book.title}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                  </a>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mb-2">
                    {book.author}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex">
                      {renderStars(book.rating)}
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(book.finishedDate).getFullYear()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {book.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                    {book.tags.length > 2 && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        +{book.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {book.notesUrl && (
                    <a
                      href={book.notesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-1.5 w-full px-3 py-1.5 text-xs font-medium text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/30 hover:bg-primary-100 dark:hover:bg-primary-900/40 rounded-lg transition-colors"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      My Notes
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <AnimatedSection>
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No books found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
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
      </div>
    </div>
  );
};

export default Bookshelf;
