import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';

// Lazy load non-critical pages for faster initial load
const About = lazy(() => import('./pages/About'));
const Uses = lazy(() => import('./pages/Uses'));
const Experience = lazy(() => import('./pages/Experience'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Bookshelf = lazy(() => import('./pages/Bookshelf'));
const Photography = lazy(() => import('./pages/Photography'));
const ReadingList = lazy(() => import('./pages/ReadingList'));
const Connect = lazy(() => import('./pages/Connect'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="uses" element={<Suspense fallback={<PageLoader />}><Uses /></Suspense>} />
          <Route path="experience" element={<Suspense fallback={<PageLoader />}><Experience /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<PageLoader />}><Projects /></Suspense>} />
          <Route path="blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
          <Route path="bookshelf" element={<Suspense fallback={<PageLoader />}><Bookshelf /></Suspense>} />
          <Route path="photography" element={<Suspense fallback={<PageLoader />}><Photography /></Suspense>} />
          <Route path="reading-list" element={<Suspense fallback={<PageLoader />}><ReadingList /></Suspense>} />
          <Route path="connect" element={<Suspense fallback={<PageLoader />}><Connect /></Suspense>} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
