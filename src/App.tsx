import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Uses from './pages/Uses';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Bookshelf from './pages/Bookshelf';
import Photography from './pages/Photography';
import ReadingList from './pages/ReadingList';
import Connect from './pages/Connect';
import Analytics from './pages/Analytics';
import { useAnalytics } from './hooks/useAnalytics';

function App() {
  // Initialize analytics tracking
  useAnalytics();

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="uses" element={<Uses />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blog" element={<Blog />} />
          <Route path="bookshelf" element={<Bookshelf />} />
          <Route path="photography" element={<Photography />} />
          <Route path="reading-list" element={<ReadingList />} />
          <Route path="connect" element={<Connect />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;