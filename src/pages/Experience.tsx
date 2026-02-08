import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  techStack: string[];
  hasPhotos?: boolean;
  photoFolder?: string;
}

interface YearMarkerProps {
  year: string;
  index: number;
}

interface ExperienceItemProps extends Experience {
  isLeft: boolean;
  index: number;
}

const YearMarker: React.FC<YearMarkerProps> = ({ year, index }) => {
  return (
    <AnimatedSection
      delay={index * 0.05}
      className="relative flex items-center justify-center mb-6"
    >
      <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-1.5 rounded-full text-sm font-semibold shadow-md">
        {year}
      </div>
    </AnimatedSection>
  );
};

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  company,
  role,
  period,
  location,
  achievements,
  techStack,
  isLeft,
  index,
  hasPhotos,
  photoFolder,
}) => {
  const navigate = useNavigate();

  const handlePhotoClick = () => {
    if (photoFolder) {
      navigate(`/photography?filter=${photoFolder}`);
    }
  };

  return (
    <AnimatedSection
      delay={index * 0.1}
      className={`relative flex items-center justify-center mb-8 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-400 border-[3px] border-white dark:border-gray-900 z-10 shadow-sm" />

      {/* Content card */}
      <div
        className={`card-accent relative bg-white dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 shadow-card hover:shadow-card-hover transition-all duration-300 rounded-xl p-6 md:w-5/12 ml-10 md:ml-0 ${
          isLeft ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{company}</h3>
            <h4 className="text-base font-medium text-primary-600 dark:text-primary-400">{role}</h4>
          </div>
          {hasPhotos && (
            <button
              onClick={handlePhotoClick}
              className="ml-3 p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950/30"
              title={`View ${company} photos`}
            >
              <Camera className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{period} · {location}</p>

        {/* Achievements */}
        <ul className="space-y-2 mb-4">
          {achievements.map((achievement, i) => (
            <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-400 dark:bg-primary-500 mt-2 mr-2.5 flex-shrink-0"></span>
              {achievement}
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="border-t border-gray-100 dark:border-gray-700/50 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

type TimelineItem =
  | { type: 'year'; year: string }
  | { type: 'experience'; experience: Experience; expIndex: number };

const Experience: React.FC = () => {
  const experiences: Experience[] = [
    {
      company: 'Cherry Technologies',
      role: 'Backend Engineer',
      period: 'Jul 2023 – Present',
      location: 'San Francisco & Istanbul',
      achievements: [
        'Built backend services for a U.S. healthcare BNPL platform using Spring Boot and Kotlin.',
        'Created notification workflows handling 150K SMS and 20K emails per day via Twilio and SendGrid.',
        'Refactored a legacy Python search-sync system into a high-throughput Maxwell→RabbitMQ→Elasticsearch pipeline, improving latency from 30s to 500ms (20K events/min).',
        'Upgraded n8n from v0.198 to v1.80 with zero downtime; migrated 7TB of historical data to a legacy read-only instance.',
        'Led architecture and stakeholder alignment for migrations; maintained system health via NewRelic, SonarQube, and GitLab CI/CD.',
      ],
      techStack: ['Spring Boot', 'Kotlin', 'Python', 'Maxwell', 'RabbitMQ', 'Elasticsearch', 'n8n', 'NewRelic', 'SonarQube', 'CI/CD'],
      hasPhotos: true,
      photoFolder: 'Cherry',
    },
    {
      company: 'Trendyol Group',
      role: 'Backend Engineer',
      period: 'Jun 2021 – Jul 2023',
      location: 'Istanbul, Turkey',
      achievements: [
        'Maintained high-traffic seller-platform services (3K RPM, 99.99% uptime, 0.001% error rate) using Spring Boot (Java/Kotlin) and Go.',
        'Reduced search latency by 30% by integrating Elasticsearch into the product-note system.',
        'Built microservices in an event-driven Kafka architecture; streamlined deployments with GitLab CI/CD, Docker, and Kubernetes.',
        'Increased test coverage from 50% to 90% using JUnit and Mockito; contributed React features in a micro-frontend.',
      ],
      techStack: ['Spring Boot', 'Kotlin', 'Java', 'Go', 'Elasticsearch', 'Kafka', 'CI/CD', 'JUnit', 'React'],
      hasPhotos: true,
      photoFolder: 'Trendyol',
    },
    {
      company: 'IOTIQ',
      role: 'Software Engineering Intern',
      period: 'Jul 2020',
      location: 'Leipzig, Germany',
      achievements: [
        'Built a native Android app (Java) to optimize factory pallet-truck routing, reducing latency by 30%.',
        'Developed a lightweight MQTT broker in JavaScript and containerized it using Docker.',
      ],
      techStack: ['Java', 'Android', 'JavaScript', 'MQTT', 'Docker'],
    },
    {
      company: 'Facebook',
      role: 'Enterprise Engineer Intern',
      period: 'Jun 2020',
      location: 'Dublin, Ireland',
      achievements: [
        'Accepted an internship offer as Enterprise Engineer Intern but canceled due to COVID-19.',
        'Completed virtual onboarding modules and technical workshops after cancellation.',
      ],
      techStack: ['Data Structures', 'Algorithms'],
    },
    {
      company: 'TÜBİTAK BİLGEM',
      role: 'Software Engineer Intern',
      period: 'Jul 2019 – Sep 2019',
      location: 'Ankara, Turkey',
      achievements: [
        'Performed an internship at the Cyber Security Institute; administered Jira and Bitbucket systems.',
        'Extracted and analyzed data via Twitter and Instagram APIs.',
        'Assisted senior researchers in developing automated scripts for vulnerability scanning.',
      ],
      techStack: ['Jira', 'Bitbucket', 'Python'],
    },
  ];

  const currentYear = new Date().getFullYear().toString();

  const renderTimelineItem = (item: TimelineItem, index: number) => {
    if (item.type === 'year') {
      return <YearMarker key={`year-${item.year}`} year={item.year} index={index} />;
    }

    return (
      <ExperienceItem
        key={`exp-${item.expIndex}`}
        {...item.experience}
        isLeft={item.expIndex % 2 === 0}
        index={index}
      />
    );
  };

  // Timeline structure with years and experiences
  const timelineData = [
    { type: 'year', year: currentYear },
    { type: 'experience', experience: experiences[0], expIndex: 0 },
    { type: 'year', year: '2023' },
    { type: 'experience', experience: experiences[1], expIndex: 1 },
    { type: 'year', year: '2021' },
    { type: 'experience', experience: experiences[2], expIndex: 2 },
    { type: 'experience', experience: experiences[3], expIndex: 3 },
    { type: 'year', year: '2020' },
    { type: 'experience', experience: experiences[4], expIndex: 4 },
    { type: 'year', year: '2019' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Career</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">My Experience</h1>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-3 md:left-1/2 transform md:-translate-x-1/2 w-px bg-gray-200 dark:bg-gray-800 z-0"></div>

          {/* Timeline items */}
          <div className="relative z-10">
            {timelineData.map(renderTimelineItem)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
