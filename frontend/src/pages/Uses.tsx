import React from 'react';
import { Monitor, Mouse, Keyboard, Zap, Code, Terminal, Smartphone, Headphones, BookOpen, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Uses: React.FC = () => {
  const hardwareItems = [
    {
      name: 'MacBook Pro 14" (M3 Max)',
      description: 'My primary development machine with incredible performance and battery life.',
      usage: 'Used for all development work, design, video editing, and daily computing tasks.',
      icon: <Monitor className="h-6 w-6" />,
      link: 'https://www.apple.com/macbook-pro/'
    },
    {
      name: 'LG Gram +view 16" Portable Monitor',
      description: '16" WQXGA (2560 x 1600) Portable IPS Display with DCI-P3 99% color accuracy and USB-C connectivity.',
      usage: 'Extended screen real estate for coding, design work, and multitasking on the go.',
      icon: <Monitor className="h-6 w-6" />,
      link: 'https://www.lg.com/us/laptops/lg-16mq70.adsu1-portable-laptop-monitor'
    },
    {
      name: 'North Bayou NB F160 Monitor Arm',
      description: 'Dual arm monitor stand with gas spring for 17-27" monitors, supporting 2-9kg weight.',
      usage: 'Ergonomic positioning of monitors for comfortable viewing angles and desk space optimization.',
      icon: <Monitor className="h-6 w-6" />,
      link: 'https://www.amazon.com.tr/dp/B0BLG3M2JP?ref=cm_sw_r_cso_cp_apin_dp_WB5WJTHMFT1RF3NA89M4'
    },
    {
      name: 'O-Flex Electric Height Adjustable Desk',
      description: 'Single motor electric standing desk with height adjustment for ergonomic working positions.',
      usage: 'Switching between sitting and standing throughout the day for better health and productivity.',
      icon: <Monitor className="h-6 w-6" />,
      link: 'https://karr.store/products/o-flex-tek-motorlu-elektrikli-yukseklik-ayarli-beyaz-ayak-masa?variant=41737622388820'
    },
    {
      name: 'Logitech MX Master 3S',
      description: 'Ergonomic wireless mouse with customizable buttons and smooth scrolling.',
      usage: 'Essential for productivity with gesture controls and multi-device switching.',
      icon: <Mouse className="h-6 w-6" />,
      link: 'https://www.logitech.com/en-us/products/mice/mx-master-3s.html'
    },
    {
      name: 'Logitech MX Keys',
      description: 'Low-profile wireless keyboard with backlit keys and smart illumination.',
      usage: 'Perfect for long coding sessions with comfortable key travel and multi-device support.',
      icon: <Keyboard className="h-6 w-6" />,
      link: 'https://www.logitech.com/en-us/products/keyboards/mx-keys-wireless-keyboard.html'
    },
    {
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with titanium build and advanced camera system.',
      usage: 'Mobile development testing, photography, and staying connected on the go.',
      icon: <Smartphone className="h-6 w-6" />,
      link: 'https://www.apple.com/iphone-15-pro/'
    },
    {
      name: 'AirPods Pro (2nd Gen)',
      description: 'Noise-cancelling wireless earbuds with spatial audio.',
      usage: 'Focus during coding sessions, calls, and listening to music while working.',
      icon: <Headphones className="h-6 w-6" />,
      link: 'https://www.apple.com/airpods-pro/'
    },
    {
      name: 'Kindle Paperwhite',
      description: 'E-reader with high-resolution display and adjustable warm light.',
      usage: 'Reading technical books, documentation, and staying updated with industry trends.',
      icon: <BookOpen className="h-6 w-6" />,
      link: 'https://www.amazon.com/kindle-paperwhite'
    }
  ];

  const softwareItems = [
    {
      name: 'Raycast',
      description: 'Blazingly fast launcher and productivity tool that replaces Spotlight.',
      usage: 'Quick app launching, clipboard history, snippets, and custom workflows.',
      icon: <Zap className="h-6 w-6" />,
      link: 'https://www.raycast.com/'
    },
    {
      name: 'Cursor',
      description: 'An improved version of VSCode with AI-powered coding assistance and enhanced developer experience.',
      usage: 'Primary code editor for web development with AI pair programming and intelligent code completion.',
      icon: <Code className="h-6 w-6" />,
      link: 'https://cursor.sh/'
    },
    {
      name: 'Warp',
      description: 'Modern terminal with AI-powered command suggestions and collaborative features.',
      usage: 'Command line interface with intelligent autocomplete, command history.',
      icon: <Terminal className="h-6 w-6" />,
      link: 'https://www.warp.dev/'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What I Use
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A curated list of the hardware and software tools that power my daily workflow and help me build amazing things.
            </p>
          </div>
        </AnimatedSection>

        {/* Hardware Section */}
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Monitor className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
              Hardware
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {hardwareItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-primary-600 dark:text-primary-400 mr-3">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
                      aria-label={`Visit ${item.name} website`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      What I use it for:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {item.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Software Section */}
        <AnimatedSection>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Code className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
              Software
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {softwareItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-primary-600 dark:text-primary-400 mr-3">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
                      aria-label={`Visit ${item.name} website`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      What I use it for:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {item.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Footer Note */}
        <AnimatedSection>
          <div className="mt-16 text-center">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 border border-primary-200 dark:border-primary-800">
              <p className="text-primary-700 dark:text-primary-300 text-lg">
                This setup evolves constantly as I discover new tools and optimize my workflow. 
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Uses; 