export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'AI / Systems' | 'Developer Tools';
  year: string;
  status: string;
  featured: boolean;
  image: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
}

export interface TechNode {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Systems & DB' | 'AI & Tools';
  level: number; // 1-5
  x: number; // 0-100 position percentage
  y: number; // 0-100 position percentage
  connections: string[]; // Connected tech node IDs
  description: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Saruhasan Thavachelvan",
    role: "Computing & Information Systems Degree Undergraduate / Software Developer",
    location: "Sabaragamuwa University of Sri Lanka",
    availability: "Available for High-Impact Software Engineering Roles & Collaborations",
    tagline: "Engineering full-stack web platforms, collaborative writing apps, and mobile software with in-depth JavaScript expertise.",
    bio: [
      "I am an undergraduate student reading for a degree in Computing and Information Systems at Sabaragamuwa University of Sri Lanka.",
      "Possessing in-depth knowledge of JavaScript and full-stack software development, I build responsive frontend interfaces, scalable backend microservices, and optimized databases.",
      "My featured projects include XMusic (a full-stack music streaming platform), Lifeline (a real-time story writing platform), and Sthetics (a cross-platform mobile fitness app)."
    ],
    philosophy: [
      {
        title: "In-Depth Core Foundations",
        desc: "Deep mastery of JavaScript fundamentals, asynchronous execution models, and modern full-stack architectures."
      },
      {
        title: "Clean End-to-End Delivery",
        desc: "Seamless integration across frontend UI, backend REST APIs, relational/NoSQL databases, and mobile environments."
      },
      {
        title: "Agile & Infrastructure Focused",
        desc: "Building with containerized DevOps workflows (Docker, Kubernetes, Nginx) and collaborative Agile methodologies."
      }
    ],
    stats: [
      { label: "Degree Stream", value: "CIS @ Sabaragamuwa Uni" },
      { label: "Featured Projects", value: "3 Core Apps" },
      { label: "Core Expertise", value: "In-Depth JavaScript" },
      { label: "Tech Stack", value: "15 Technologies" }
    ]
  },

  projects: [
    {
      id: "xmusic",
      title: "XMusic",
      tagline: "Full-stack music streaming platform",
      category: "Full-Stack",
      year: "2025",
      status: "PRODUCTION",
      featured: true,
      image: "/images/projects/xmusic.png",
      description: "A comprehensive music streaming web application engineered across frontend, backend, and database layers, featuring low-latency audio playback, user playlists, and query optimization.",
      problem: "Music listeners require a responsive web streaming interface capable of instant playback controls, custom playlist creation, and seamless audio state persistence.",
      solution: "Engineered a full-stack architecture utilizing React and Next.js for the user interface, Node.js & Express.js for backend REST APIs, and database storage across MySQL & MongoDB.",
      result: "Delivered full-stack audio streaming experience with instant playback responsiveness, custom user library management, and structured database schema.",
      techStack: ["React", "Next.js", "Node.js", "Express.js", "MySQL", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/saruhasan/xmusic",
      liveUrl: "https://xmusic-stream.vercel.app",
      metrics: [
        { label: "Architecture", value: "Full-Stack" },
        { label: "Modules", value: "Frontend, Backend & DB" }
      ]
    },
    {
      id: "lifeline",
      title: "Lifeline",
      tagline: "Collaborative story writing platform",
      category: "Full-Stack",
      year: "2025",
      status: "LIVE",
      featured: true,
      image: "/images/projects/lifeline.png",
      description: "An interactive story writing and publishing platform empowering creators to write, edit, and publish stories with real-time database synchronization and reader engagement feeds.",
      problem: "Writers lack a clean, distractor-free web editor with instant cloud persistence, author profiles, and real-time reader interaction.",
      solution: "Built a modern web application leveraging React and Firebase Cloud Firestore for real-time document synchronization, user authentication, and story feeds.",
      result: "Created a distraction-free story writing platform with instant real-time sync and author community feeds.",
      techStack: ["React", "Firebase", "JavaScript", "Tailwind CSS"],
      githubUrl: "https://github.com/saruhasan/lifeline",
      liveUrl: "https://lifeline-stories.vercel.app",
      metrics: [
        { label: "Database", value: "Firebase Realtime" },
        { label: "Stack", value: "React + Firebase" }
      ]
    },
    {
      id: "sthetics",
      title: "Sthetics",
      tagline: "Mobile fitness & lifestyle tracking application",
      category: "Full-Stack",
      year: "2025",
      status: "STABLE",
      featured: true,
      image: "/images/projects/spatial.jpg",
      description: "Cross-platform mobile application designed for workout routine tracking, customized aesthetic schedule planning, and REST API database synchronization.",
      problem: "Fitness enthusiasts need a fast mobile interface to log workouts, track exercise progression, and sync routine schedules with server storage.",
      solution: "Developed a native mobile application using React Native for cross-platform UI, Express.js backend services, and MySQL relational database persistence.",
      result: "Launched cross-platform mobile fitness app with fast client-server API synchronization and structured exercise logging.",
      techStack: ["React Native", "Express.js", "MySQL", "Node.js", "JavaScript"],
      githubUrl: "https://github.com/saruhasan/sthetics",
      liveUrl: "https://sthetics-app.vercel.app",
      metrics: [
        { label: "Platform", value: "React Native Mobile" },
        { label: "Backend", value: "Express + MySQL" }
      ]
    }
  ] as Project[],

  skills: {
    nodes: [
      {
        id: "javascript",
        name: "JavaScript (In-Depth)",
        category: "Frontend",
        level: 5,
        x: 18,
        y: 22,
        connections: ["react", "nextjs", "node", "express"],
        description: "In-depth core mastery of ES6+, Event Loop, Closures, Async/Await, Prototypes, and DOM architecture."
      },
      {
        id: "python",
        name: "Python",
        category: "Systems & DB",
        level: 4,
        x: 36,
        y: 18,
        connections: ["javascript", "node", "mysql", "mongodb"],
        description: "Data structures, scripting, backend logic, Object-Oriented programming, and API integration."
      },
      {
        id: "react",
        name: "React",
        category: "Frontend",
        level: 5,
        x: 54,
        y: 20,
        connections: ["javascript", "nextjs", "reactnative", "tailwind"],
        description: "Component architecture, Hooks, State management, Context API, and high-performance UI rendering."
      },
      {
        id: "nextjs",
        name: "Next.js",
        category: "Frontend",
        level: 5,
        x: 72,
        y: 22,
        connections: ["react", "javascript", "tailwind", "express"],
        description: "App Router, SSR, SSG, API Routes, Server Actions, and performance optimization."
      },
      {
        id: "reactnative",
        name: "React Native",
        category: "Frontend",
        level: 4,
        x: 88,
        y: 24,
        connections: ["react", "express", "mysql"],
        description: "Cross-platform mobile app development, native navigation, mobile UI components, and API sync."
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        category: "Frontend",
        level: 5,
        x: 80,
        y: 48,
        connections: ["react", "nextjs", "figma"],
        description: "Utility-first CSS, custom design systems, responsive grid layouts, and modern aesthetics."
      },
      {
        id: "node",
        name: "Node.js",
        category: "Backend",
        level: 5,
        x: 22,
        y: 52,
        connections: ["javascript", "express", "mongodb", "mysql"],
        description: "Asynchronous server runtime, REST APIs, middleware execution, and file system I/O."
      },
      {
        id: "express",
        name: "Express.js",
        category: "Backend",
        level: 5,
        x: 40,
        y: 54,
        connections: ["node", "javascript", "mongodb", "mysql", "docker"],
        description: "RESTful API routes, custom middleware pipelines, CORS, authentication, and error handling."
      },
      {
        id: "mongodb",
        name: "MongoDB",
        category: "Systems & DB",
        level: 4,
        x: 24,
        y: 80,
        connections: ["node", "express", "javascript"],
        description: "NoSQL document collections, Mongoose ODM, aggregation pipelines, and JSON data modeling."
      },
      {
        id: "mysql",
        name: "MySQL",
        category: "Systems & DB",
        level: 4,
        x: 44,
        y: 82,
        connections: ["node", "express", "reactnative"],
        description: "Relational database schema design, SQL joins, primary/foreign key indexing, and transaction integrity."
      },
      {
        id: "docker",
        name: "Docker",
        category: "AI & Tools",
        level: 4,
        x: 62,
        y: 54,
        connections: ["kubernetes", "nginx", "express"],
        description: "Containerization, multi-stage Dockerfiles, Docker Compose container setups, and environment isolation."
      },
      {
        id: "kubernetes",
        name: "Kubernetes",
        category: "AI & Tools",
        level: 4,
        x: 82,
        y: 54,
        connections: ["docker", "nginx"],
        description: "Container orchestration, Pod management, service routing, and scalable cloud deployments."
      },
      {
        id: "nginx",
        name: "Nginx",
        category: "AI & Tools",
        level: 4,
        x: 64,
        y: 80,
        connections: ["docker", "kubernetes", "nextjs"],
        description: "Reverse proxy server, load balancing, static asset caching, and HTTP/2 request routing."
      },
      {
        id: "figma",
        name: "Figma",
        category: "AI & Tools",
        level: 4,
        x: 82,
        y: 78,
        connections: ["tailwind", "react"],
        description: "UI/UX wireframing, high-fidelity mockup design, component design systems, and developer handoff."
      },
      {
        id: "agile",
        name: "Agile Methodologies",
        category: "AI & Tools",
        level: 4,
        x: 48,
        y: 35,
        connections: ["figma", "express", "react"],
        description: "Iterative sprint planning, user stories, continuous feedback loops, and collaborative software delivery."
      }
    ] as TechNode[],
    principles: [
      {
        icon: "Cpu",
        title: "In-Depth JavaScript Engine",
        desc: "Strong core understanding of language mechanics, asynchronous event loops, and full-stack execution."
      },
      {
        icon: "Layers",
        title: "Full-Stack Integration",
        desc: "Cohesive integration across modern web UI (React, Next.js), mobile (React Native), backend (Node, Express), and databases."
      },
      {
        icon: "Zap",
        title: "DevOps & Agile Delivery",
        desc: "Containerized deployment workflows (Docker, Kubernetes, Nginx) guided by iterative Agile development practices."
      }
    ]
  },

  now: {
    status: "SYSTEM OPERATIONAL",
    uptime: "100%",
    currentLocation: "Sabaragamuwa University of Sri Lanka",
    currentlyBuilding: {
      title: "Full-Stack Web & Mobile Portfolio Platforms",
      desc: "Engineering high-performance web applications and mobile software using React, Next.js, React Native, and Node.js.",
      progress: 96
    },
    currentlyLearning: [
      "Computing & Information Systems Degree Coursework",
      "Advanced Database Optimization (MySQL & MongoDB)",
      "DevOps Container Orchestration (Kubernetes & Docker)"
    ],
    exploring: [
      "Full-Stack Web Architecture & Scalable Microservices",
      "Cross-Platform Native Mobile Development",
      "UI/UX Design Systems in Figma"
    ],
    recentLogs: [
      { time: "2026-08-18 18:00", msg: "Refactored XMusic audio streaming backend routes and MySQL/MongoDB schema" },
      { time: "2026-08-18 15:30", msg: "Built Lifeline story editor with Firebase real-time database synchronization" },
      { time: "2026-08-18 12:10", msg: "Updated Sthetics mobile app with React Native & Express API endpoints" }
    ]
  },

  contact: {
    email: "saruatwork@gmail.com",
    github: "https://github.com/Saru-Work",
    linkedin: "www.linkedin.com/in/saruhasan-thavachelvan",
    twitter: "https://x.com/Saruhasan270669"
  }
};
