import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X, Github, Linkedin, Mail, FileText, Instagram, Moon, Sun, ChevronDown, Users } from 'lucide-react';

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const contentDropdownItems = [
    { name: 'Blog', path: '/blog' },
    { name: 'Bookshelf', path: '/bookshelf' },
    { name: 'Reading List', path: '/reading-list' },
    { name: 'What I Use', path: '/uses' }
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: 'https://github.com/burakintisah', label: 'GitHub' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com/in/burakintisah', label: 'LinkedIn' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/osman.burakk', label: 'Instagram' },
    { icon: <Mail className="h-5 w-5" />, href: 'mailto:burak.intisah@gmail.com', label: 'Email' },
    { icon: <FileText className="h-5 w-5" />, href: '/burak_intisah_resume.pdf', label: 'Resume' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isContentSectionActive = () => {
    return location.pathname === '/blog' || location.pathname === '/bookshelf' || location.pathname === '/reading-list' || location.pathname === '/uses';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col relative">
      {/* Decorative background elements — GPU-accelerated with reduced blur for Safari compat */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Gradient mesh orbs — transform-gpu forces GPU compositing to prevent Safari blank-page rendering */}
        <div className="absolute -top-[200px] right-[5%] w-[900px] h-[900px] bg-primary-300/20 dark:bg-primary-500/8 rounded-full blur-[80px] transform-gpu" />
        <div className="absolute top-[30%] -left-[100px] w-[700px] h-[700px] bg-rose-200/15 dark:bg-rose-500/5 rounded-full blur-[70px] transform-gpu" />
        <div className="absolute bottom-[10%] right-[15%] w-[800px] h-[800px] bg-sky-200/15 dark:bg-sky-500/5 rounded-full blur-[75px] transform-gpu" />
        <div className="absolute bottom-[-150px] left-[20%] w-[700px] h-[700px] bg-amber-100/15 dark:bg-amber-500/5 rounded-full blur-[65px] transform-gpu" />
        {/* Dot pattern */}
        <div className="bg-dot-pattern absolute inset-0 opacity-50 dark:opacity-30" />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] border-b border-gray-100 dark:border-gray-800'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-950/50 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 transition-colors">
                <Terminal className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white tracking-tight">Burak Intisah</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/about')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                About Me
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
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
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isContentSectionActive()
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <span>Content</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${contentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-elevated dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-700 transition-all duration-200 ${
                  contentDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="p-1.5">
                    {contentDropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
                          isActive(item.path)
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
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
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/photography')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                Photography
              </Link>

              <Link
                to="/connect"
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/connect')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Connect</span>
              </Link>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-[70] md:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Side Panel */}
        <nav className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-elevated transform transition-transform duration-300 ease-in-out z-[75]`}>
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-950/50">
                <Terminal className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Menu</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Content */}
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex-1 px-4 py-6 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive('/')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive('/about')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                About Me
              </Link>

              {/* Main Navigation */}
              <div className="pt-4 pb-2">
                <div className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Work</div>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Content Section */}
              <div className="pt-4 pb-2">
                <div className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Content</div>
              </div>
              {contentDropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ml-2 ${
                    isActive(item.path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-2"></div>

              <Link
                to="/photography"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive('/photography')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                Photography
              </Link>

              <Link
                to="/connect"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive('/connect')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Connect</span>
              </Link>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="text-base font-medium">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      <main className="flex-1 pt-16 relative z-10">
        <Outlet />
      </main>

      {/* Social Links - Glass card sidebar */}
      <div className="fixed bottom-8 right-6 z-50 hidden sm:flex flex-col items-center space-y-1 p-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-card">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-all duration-200"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>

      <footer className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/90 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-950/50">
                <Terminal className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">Burak Intisah</span>
            </div>
            <div className="text-sm text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} Osman Burak Intisah
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
