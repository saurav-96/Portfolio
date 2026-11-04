import { getAssetPath } from '@/lib/assets';

export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  category: string;
  filterGroup: string;
  projectNature: string;
  statusClass: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  overview: string;
  problem: string;
  objective: string;
  contribution: string;
  designProcess: string;
  techStack: string[];
  challenges: string;
  outcomes: string;
  galleryAssets?: { title: string; src: string }[];
  featureBreakdown?: {
    implemented: string[];
    planned: string[];
  };
}

export const PROJECT_CASE_STUDIES = {
    swasthyasutra: {
      id: 'swasthyasutra',
      number: 'PROJECT 01',
      title: 'SwasthyaSutra',
      category: 'Healthcare Technology',
      filterGroup: 'web',
      projectNature: 'Personal Web Application Prototype (Live Demo)',
      statusClass: 'status-live',
      thumbnail: getAssetPath('/assets/projects/swasthyasutra-thumb.png'),
      liveUrl: 'https://saurav-96.github.io/SwasthyaSutra/',
      githubUrl: 'https://github.com/saurav-96/SwasthyaSutra',
      overview:
        'A healthcare-focused digital platform designed to make healthcare information, real-time vitals dashboards, and digital health services more accessible and intuitive.',
      problem:
        'Many digital health portals suffer from cluttered interfaces, confusing navigation, and poor mobile responsiveness, making it difficult for users to quickly understand health metrics or book appointments.',
      objective:
        'Design and build an accessible, dark-mode-ready healthcare web experience that presents health monitoring insights, appointment pathways, and AI-assisted guidance (SanjeevanAI concept) in a clean visual hierarchy.',
      contribution:
        'End-to-end UI/UX Architecture, Visual Identity, Frontend Engineering (React, Tailwind CSS, JavaScript), Interactive Dashboard Components, and Responsive Layout Implementation.',
      designProcess:
        'Structured around high-contrast data cards, calm cyan/blue medical trust accents, and clear call-to-action buttons so users can move from overview metrics to specific health tools without cognitive overload.',
      techStack: ['React', 'Tailwind CSS', 'SanjeevanAI Engine', 'Real-Time Vitals UI', 'Telemedicine Portal', 'Responsive UX'],
      challenges:
        'Balancing dense health metric visualizations (heart rate BPM, sync indicators, and AI insight cards) while maintaining generous whitespace and fast load performance on mobile browsers.',
      outcomes:
        'Delivered a functional, multi-section live web application demonstrating healthcare dashboard UI design and responsive frontend implementation.'
    },

    keyflow: {
      id: 'keyflow',
      number: 'PROJECT 02',
      title: 'KeyFlow',
      category: 'Productivity Web Application',
      filterGroup: 'web',
      projectNature: 'Personal Web Application (Live Demo)',
      statusClass: 'status-live',
      thumbnail: getAssetPath('/assets/projects/keyflow-thumb.png'),
      liveUrl: 'https://saurav-96.github.io/KeyFlow/',
      githubUrl: 'https://github.com/saurav-96/KeyFlow',
      overview:
        'A productivity-focused web experience designed around keyboard shortcut organization, workflow management, and rapid muscle-memory lookup.',
      problem:
        'Developers and designers switch between VS Code, Figma, Chrome, and OS environments daily, often forgetting time-saving keyboard shortcuts or burying them in static text notes.',
      objective:
        'Create a tactile, searchable personal keyboard command center where users can filter shortcuts by application, pin favorites, add custom bindings, and import/export collections.',
      contribution:
        'Product Concept, UI/UX Component System (tactile 3D keycaps, live key capture, workspace sidebar, quick-filter chips), State & LocalStorage Persistence, and RFC 4180 CSV/JSON Portability.',
      designProcess:
        'Designed with a clean dashboard layout featuring instant application filters (VS Code, Chrome, Windows, Figma, Photoshop), one-click copy actions, and OS-aware keycap notation.',
      techStack: ['React 19', 'Vite 6', 'Tailwind CSS', 'Lucide Icons', 'Vitest Tested', 'LocalStorage Persistence'],
      challenges:
        'Designing keycap combinations so multi-key bindings (such as Ctrl + Shift + P) remain readable, aligned, and scannable across both desktop and mobile viewports.',
      outcomes:
        'Published as a live interactive web application that showcases stateful frontend logic, clean dashboard typography, and practical developer productivity tooling.'
    },

    egov: {
      id: 'egov',
      number: 'PROJECT 03',
      title: 'E-Government Platform (Butwal SmartGov)',
      category: 'Civic Technology',
      filterGroup: 'web',
      projectNature: 'Civic Tech Concept & Live Portal Prototype',
      statusClass: 'status-live',
      thumbnail: getAssetPath('/assets/projects/egov-thumb.png'),
      liveUrl: 'https://saurav-96.github.io/E-Governmet-platform/',
      githubUrl: 'https://github.com/saurav-96/E-Governmet-platform',
      overview:
        'A digital governance platform concept (Butwal SmartGov) focused on making municipal public services, department statuses, and civic announcements more accessible through modern web technologies.',
      problem:
        'Traditional municipal websites are often difficult to navigate, text-heavy, and lack clear status visibility across public departments like healthcare, traffic safety, education, and agriculture.',
      objective:
        'Reimagine how a local sub-metropolitan portal can organize civic services, real-time department indicators, and public announcements into a modern, transparent dashboard.',
      contribution:
        'Information Architecture, Civic Dashboard UI Design, Bilingual-ready Navigation Structure, Department Status Cards, and Responsive Frontend Development.',
      designProcess:
        'Organized municipal workflows into a clear left-hand department directory paired with an executive overview dashboard highlighting citizen service categories and recent city notices.',
      techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Lucide Icons'],
      challenges:
        'Structuring municipal departments (Health, Agriculture, Traffic Safety, Environment, Education, IT, Tourism, Business, Gov Services) into an intuitive navigation system.',
      outcomes:
        'Created a live civic technology demonstration hosted on GitHub Pages that illustrates how thoughtful UI/UX can modernize public-sector digital portals.'
    },

    youtubepowertools: {
      id: 'youtubepowertools',
      number: 'PROJECT 04',
      title: 'YouTube Power-Tools (TubeKit)',
      category: 'Browser Extension / JavaScript',
      filterGroup: 'web',
      projectNature: 'CS50x Final Project & Browser Extension',
      statusClass: 'status-live',
      thumbnail: getAssetPath('/assets/projects/tubekit-thumb.png'),
      liveUrl: 'https://github.com/saurav-96/TubeKit',
      githubUrl: 'https://github.com/saurav-96/TubeKit',
      overview:
        'A browser extension project exploring useful YouTube productivity features, including 0.10x–4.00x precision playback speed controls, HD thumbnail capture, lossless PNG frame screenshots, and custom keyboard shortcuts.',
      problem:
        'Students, researchers, and creators watching educational content on YouTube frequently need quick frame captures, high-resolution thumbnails, or fine-grained playback speed adjustments without leaving the player.',
      objective:
        'Build a lightweight Chromium browser extension using Manifest V3 that injects a glassmorphic 7-control utility bar directly into the YouTube watch experience.',
      contribution:
        'Chrome Extension Architecture (Manifest V3), Content Script DOM Integration, Popup Interface Design, Canvas Frame Capture Logic, and Keyboard Shortcut Handlers.',
      designProcess:
        'Focused on zero-clutter ergonomics so utility triggers blend naturally with YouTube’s dark interface while providing instant feedback.',
      featureBreakdown: {
        implemented: [
          '7-element glassmorphic in-player control pill (0.10x–4.00x speed)',
          'One-click lossless PNG video frame screenshot capture via HTML5 Canvas',
          'High-resolution YouTube video thumbnail extractor',
          'Custom keyboard shortcut bindings & Chrome Storage Sync'
        ],
        planned: [
          'Timestamped markdown note export for study sessions',
          'Custom A–B loop segment bookmarking across sessions',
          'Cloud sync for saved video timestamps'
        ]
      },
      techStack: ['Chrome Extension MV3', 'JavaScript (ES6+)', 'HTML5 Canvas & Video API', 'Chrome Storage Sync', 'CS50x Final Project'],
      challenges:
        'Handling YouTube’s Single-Page Application (SPA) dynamic DOM updates reliably so injected controls persist cleanly when navigating between videos.',
      outcomes:
        'Completed as the capstone final project for Harvard University’s CS50x Introduction to Computer Science and open-sourced on GitHub.'
    },

    mindfulyou: {
      id: 'mindfulyou',
      number: 'PROJECT 05',
      title: 'Mindful You',
      category: 'UI/UX Design Concept',
      filterGroup: 'uiux',
      projectNature: 'UI/UX Design Concept & Interactive Prototype',
      statusClass: 'status-concept',
      thumbnail: getAssetPath('/assets/projects/mindful-you.svg'),
      liveUrl: '',
      githubUrl: '',
      overview:
        'A modern wellness landing page and mobile interface concept focused on clean layouts, intuitive user journeys, and conversion-oriented visual design.',
      problem:
        'Wellness and meditation apps often overwhelm new visitors with complex subscription tiers before communicating a sense of calm and product clarity.',
      objective:
        'Craft a cohesive desktop landing page and companion mobile session screen concept that guides users smoothly from value discovery to starting a guided breathing session.',
      contribution:
        'User Flow Mapping, Wireframing, High-Fidelity Visual Design in Figma, Typography & Color System Selection, and Conversion-Focused Landing Page Layout.',
      designProcess:
        'Paired serene violet-cyan gradients with generous breathing room, clear typographic hierarchy, and tactile mobile player cards to evoke mindfulness while maintaining strong CTA visibility.',
      techStack: ['Figma', 'UI/UX Wireframing', 'Interactive Prototyping', 'Design Systems', 'Responsive Layout'],
      challenges:
        'Maintaining high WCAG text contrast and clear visual hierarchy while working with soft atmospheric gradients and glassmorphic surfaces.',
      outcomes:
        'Produced a complete multi-screen UI/UX design concept demonstrating landing page conversion thinking and mobile interface craft.'
    },

    aiautomation: {
      id: 'aiautomation',
      number: 'PROJECT 06',
      title: 'AI & Automation Experiments',
      category: 'AI / Python',
      filterGroup: 'ai',
      projectNature: 'Personal R&D Sandbox & Workflow Scripts',
      statusClass: 'status-lab',
      thumbnail: getAssetPath('/assets/projects/ai-automation-lab.svg'),
      liveUrl: '',
      githubUrl: 'https://github.com/saurav-96',
      overview:
        'An evolving collection of personal experiments exploring Python automation, AI-assisted workflows, and practical scripting integrations.',
      problem:
        'Repetitive digital tasks—such as organizing project assets, formatting structured notes, or extracting metadata—consume valuable creative and development time.',
      objective:
        'Explore how Python scripts, CLI utilities, and LLM prompt workflows can automate recurring local and web tasks reliably.',
      contribution:
        'Python Scripting, Prompt Workflow Structuring, File & Data Parsing Utilities, and Browser/API Automation Exploration.',
      designProcess:
        'Built as modular, testable Python scripts and CLI experiments rather than monolithic apps, focusing on clean input/output schemas and practical daily utility.',
      techStack: ['Python', 'C', 'AI Prompt Workflows', 'JSON Schema Parsing', 'CLI Scripting'],
      challenges:
        'Structuring AI-assisted outputs so scripts handle edge cases and malformed responses gracefully with deterministic fallbacks.',
      outcomes:
        'Ongoing personal laboratory of automation scripts and workflow experiments that inform my approach to developer productivity.'
    },

    creativedesign: {
      id: 'creativedesign',
      number: 'PROJECT 07',
      title: 'Creative Design Showcase',
      category: 'Graphic Design',
      filterGroup: 'graphic',
      projectNature: 'Visual Communication & Brand Explorations',
      statusClass: 'status-concept',
      thumbnail: getAssetPath('/assets/projects/creative-design-suite.svg'),
      galleryAssets: [
        { title: 'NodeLoop Brand Identity', src: getAssetPath('/assets/projects/brand-nodeloop.svg') },
        { title: 'Automation Thumbnail Concept', src: getAssetPath('/assets/projects/thumbnail-automation.svg') },
        { title: 'BuildNext Event Poster', src: getAssetPath('/assets/projects/poster-buildnext.svg') },
        { title: 'Social Media Campaign Kit', src: getAssetPath('/assets/projects/social-campaign.svg') }
      ],
      liveUrl: '',
      githubUrl: '',
      overview:
        'A curated collection of graphic design work including logo concepts, website visual concepts, high-contrast YouTube thumbnails, promotional posters, and branding explorations.',
      problem:
        'Digital brands and creators need visual assets that capture attention immediately in crowded feeds while staying consistent with their core identity.',
      objective:
        'Develop versatile visual communication pieces across brand marks, promotional posters, and social/video thumbnails with strong focal points and typography.',
      contribution:
        'Logo Concept Design, Typography Composition, Color Direction, YouTube Thumbnail Framing, and Promotional Poster Layout.',
      designProcess:
        'Iterative sketching and digital composition in Figma and Canva, testing readability at both small thumbnail scales and full-screen poster dimensions.',
      techStack: ['Figma', 'Canva', 'Visual Identity', 'Typography', 'Vector Illustration'],
      challenges:
        'Creating bold visual impact in compact formats like YouTube thumbnails without resorting to cluttered text or unreadable contrast.',
      outcomes:
        'A versatile graphic design portfolio supporting content creators, student events, and brand identity concepts.'
    }
  };

export const PROJECTS_LIST: ProjectCaseStudy[] = Object.values(PROJECT_CASE_STUDIES) as ProjectCaseStudy[];
