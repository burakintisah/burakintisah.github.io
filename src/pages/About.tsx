import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Code, Database, Server, Cpu, Globe, BookOpen, FileText } from 'lucide-react';

const About: React.FC = () => {
  const skillCategories = [
    {
      name: "All",
      skills: []
    },
    {
      name: "Languages & Frameworks",
      skills: [
        { name: 'Java', icon: <Code className="w-6 h-6" /> },
        { name: 'Kotlin', icon: <Code className="w-6 h-6" /> },
        { name: 'Go', icon: <Code className="w-6 h-6" /> },
        { name: 'Python', icon: <Code className="w-6 h-6" /> },
        { name: 'JavaScript/Node.js', icon: <Server className="w-6 h-6" /> },
        { name: 'Spring Boot', icon: <Code className="w-6 h-6" /> },
      ]
    },
    {
      name: "Cloud & Serverless",
      skills: [
        { name: 'AWS', icon: <Server className="w-6 h-6" /> },
      ]
    },
    {
      name: "Databases",
      skills: [
        { name: 'PostgreSQL', icon: <Database className="w-6 h-6" /> },
        { name: 'RabbitMQ', icon: <Database className="w-6 h-6" /> },
        { name: 'Kafka', icon: <Database className="w-6 h-6" /> },
        { name: 'Elasticsearch', icon: <Globe className="w-6 h-6" /> },
        { name: 'Redis', icon: <Database className="w-6 h-6" /> },
      ]
    },
    {
      name: "CI/CD & Containerization",
      skills: [
        { name: 'GitLab CI/CD', icon: <BookOpen className="w-6 h-6" /> },
        { name: 'Docker', icon: <Cpu className="w-6 h-6" /> },
      ]
    }
  ];

  const allSkills = skillCategories.slice(1).flatMap(category => category.skills);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = selectedCategory === "All"
    ? allSkills
    : skillCategories.find(cat => cat.name === selectedCategory)?.skills || [];

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-2">
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">Background</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">About Me</h1>
            <div className="mt-4 flex justify-center">
              <a
                href="/burak_intisah_resume.pdf"
                download="burak_intisah_resume.pdf"
                className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Download Resume"
              >
                <FileText className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <AnimatedSection>
            <div className="flex justify-center mt-8 md:mt-12">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-400 via-primary-500 to-purple-500 opacity-20 blur-sm"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[3px] border-white dark:border-gray-800 shadow-elevated">
                  <img
                    src="/profile.png"
                    alt="Osman Burak İntişah"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">Early Career</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I ranked 1,045th out of more than three million candidates on the national university entrance exam, which allowed me to receive a full scholarship to Bilkent University, where I discovered my passion for backend systems. After graduating with a Computer Science degree and a 3.48 CGPA, I joined Trendyol as a Backend Engineer. I'm now with Cherry Technologies, where I develop and maintain payment processing systems and end-to-end banking workflows for thousands of customers each day.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">Key Skills</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                My expertise lies in designing and implementing high-performance backend systems with a focus on scalability and reliability. I specialize in distributed systems, database optimization, and writing clean, maintainable code.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">Technical Interests</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm passionate about microservice architecture, event-driven systems, performance optimization, and AI-driven workflow automation within backend environments.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Section divider */}
        <div className="section-divider max-w-lg mx-auto mb-16" />

        <AnimatedSection delay={0.4}>
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Expertise</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Technical Toolkit</h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredSkills.map((skill, index) => (
              <div
                key={`${selectedCategory}-${index}`}
                className="bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 p-4 rounded-xl flex flex-col items-center text-center hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 shadow-card hover:shadow-card-hover group"
              >
                <div className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {skill.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6} className="mt-20 text-center max-w-xl mx-auto py-10">
          <div className="section-divider mb-10" />
          <p className="text-lg italic text-gray-500 dark:text-gray-400 leading-relaxed">
            "The best way to predict the future is to invent it."
          </p>
          <p className="mt-3 text-sm text-gray-400 dark:text-gray-500 font-medium">— Alan Kay</p>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default About;
