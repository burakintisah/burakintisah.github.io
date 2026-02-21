import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Github, Linkedin, Mail, Instagram, ExternalLink, BookOpen, Users } from 'lucide-react';

const Connect: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Get in Touch</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Let's Connect</h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I'm always excited to connect with fellow developers, entrepreneurs, and curious minds.
              Feel free to reach out through any of these platforms!
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <a
              href="https://github.com/burakintisah"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-accent bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Github className="h-5 w-5 text-gray-800 dark:text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">GitHub</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check out my open source projects and contributions
              </p>
            </a>

            <a
              href="https://linkedin.com/in/burakintisah"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-accent bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect with me professionally and see my career journey
              </p>
            </a>

            <a
              href="https://www.instagram.com/osman.burakk"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-accent bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/30">
                    <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Instagram</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Follow my personal journey and behind-the-scenes moments
              </p>
            </a>

            <a
              href="https://x.com/osman_burakk"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-accent bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <svg className="h-5 w-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Twitter</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Follow my thoughts and updates on technology and life
              </p>
            </a>

            <a
              href="https://medium.com/@burak.intisah"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-accent bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                    <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Medium</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Read my articles on software development, technology and more
              </p>
            </a>

            <a
              href="mailto:burak.intisah@gmail.com"
              className="group card-accent bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30">
                    <Mail className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Email</h3>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reach out for collaborations, opportunities, or just to say hi
              </p>
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200/80 dark:border-gray-700/50 max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/40">
                <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you're looking to collaborate on a project, discuss technology trends,
              or just want to connect with a fellow developer, I'd love to hear from you.
              Don't hesitate to reach out through any of the platforms above!
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Connect;
