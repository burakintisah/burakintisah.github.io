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
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-center gap-3 mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About Me</h1>
          <a 
            href="/burak_intisah_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Download Resume"
          >
            <FileText className="h-5 w-5" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <AnimatedSection>
            <div className="flex justify-center mt-8 md:mt-12">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                <img
                  src="/profile.png"
                  alt="Osman Burak İntişah"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Early Career</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I ranked 1,045th out of more than three million candidates on the national university entrance exam, which allowed me to receive a full scholarship to Bilkent University, where I discovered my passion for backend systems. After graduating with a Computer Science degree and a 3.48 CGPA, I joined Trendyol as a Backend Engineer. I’m now with Cherry Technologies, where I develop and maintain payment processing systems and end-to-end banking workflows for thousands of customers each day.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Key Skills</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                My expertise lies in designing and implementing high-performance backend systems with a focus on scalability and reliability. I specialize in distributed systems, database optimization, and writing clean, maintainable code.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Technical Interests</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I’m passionate about microservice architecture, event-driven systems, performance optimization, and AI-driven workflow automation within backend environments.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        <AnimatedSection delay={0.4}>
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-8">Technical Toolkit</h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSkills.map((skill, index) => (
              <div 
                key={`${selectedCategory}-${index}`}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg flex flex-col items-center text-center hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <div className="w-12 h-12 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                  {skill.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={0.6} className="mt-16 text-center max-w-xl mx-auto py-8 border-t border-b border-gray-100 dark:border-gray-700">
          <p className="text-lg italic text-gray-600 dark:text-gray-400">
            “The best way to predict the future is to invent it.”
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-500">— Alan Kay</p>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default About;