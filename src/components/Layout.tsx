import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X, Github, Linkedin, Mail, FileText, Instagram, Moon, Sun, ChevronDown, Users } from 'lucide-react';

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [contentDropdownOpen, setContentDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setContentDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' }
  ];

  const aboutDropdownItems = [
    { name: 'About', path: '/about' },
    { name: 'What I Use', path: '/uses' }
  ];

  const contentDropdownItems = [
    { name: 'Blog', path: '/blog' },
    { name: 'Bookshelf', path: '/bookshelf' },
    { name: 'Reading List', path: '/reading-list' }
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: 'https://github.com/burakintisah', label: 'GitHub' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com/in/burakintisah', label: 'LinkedIn' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/osman.burakk', label: 'Instagram' },
    { icon: <Mail className="h-5 w-5" />, href: 'mailto:burak.intisah@gmail.com', label: 'Email' },
    { icon: <FileText className="h-5 w-5" />, href: '/burak_intisah_resume.pdf', label: 'Download Resume', download: true },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isAboutSectionActive = () => {
    return location.pathname === '/about' || location.pathname === '/uses';
  };

  const isContentSectionActive = () => {
    return location.pathname === '/blog' || location.pathname === '/bookshelf' || location.pathname === '/reading-list';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/50 border-b border-gray-200 dark:border-gray-700' : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors">
              <Terminal className="h-6 w-6" />
              <span className="font-semibold text-lg">Burak Intisah</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Home
              </Link>
              
              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                    isAboutSectionActive() ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                  aboutDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="py-2">
                    {aboutDropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          isActive(item.path) 
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                    isActive(link.path) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Content Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setContentDropdownOpen(true)}
                onMouseLeave={() => setContentDropdownOpen(false)}
              >
                <button
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                    isContentSectionActive() ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span>Content</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${contentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                  contentDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="py-2">
                    {contentDropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          isActive(item.path) 
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/photography"
                className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive('/photography') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Photography
              </Link>

              <Link
                to="/connect"
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive('/connect') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Connect</span>
              </Link>

              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Overlay - Moved outside header */}
      <div className={`fixed inset-0 z-[70] md:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Side Panel */}
        <nav className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-[75] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Menu</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Content */}
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex-1 px-6 py-6 space-y-6">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-medium transition-colors ${
                  isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Home
              </Link>
              
              {/* About Section */}
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">About</div>
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-lg font-medium transition-colors ml-4 ${
                      isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Main Navigation */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg font-medium transition-colors ${
                    isActive(link.path) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Content Section */}
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">Content</div>
                {contentDropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-lg font-medium transition-colors ml-4 ${
                      isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/photography"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-medium transition-colors ${
                  isActive('/photography') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Photography
              </Link>

              <Link
                to="/connect"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 text-lg font-medium transition-colors ${
                  isActive('/connect') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Connect</span>
              </Link>
            </div>

            {/* Footer with Dark Mode Toggle */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="text-lg font-medium">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
      
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Social Links */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            {...(link.download
              ? { download: 'burak_intisah_resume.pdf' }
              : { target: '_blank', rel: 'noopener noreferrer' }
            )}
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
      
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Terminal className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span className="font-medium text-gray-800 dark:text-gray-200">Burak Intisah</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Osman Burak Intisah
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;