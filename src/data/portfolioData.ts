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
    name: "Saruhasan",
    role: "Computer Science & Engineering Student / Software Developer",
    location: "Bengaluru, India",
    availability: "Available for High-Impact Roles & Collaborations",
    tagline: "Building software that solves real problems with spatial elegance and system precision.",
    bio: [
      "I am a Computer Science student and software engineer driven by the pursuit of minimal, deterministic, and high-performance digital experiences.",
      "My work bridges low-level system design with state-of-the-art Web UI craftsmanship — creating software that feels physical, effortless, and alive.",
      "I focus on component-driven architectures, distributed data flows, real-time agent orchestration, and dark spatial interfaces."
    ],
    philosophy: [
      {
        title: "Physical Digitality",
        desc: "Interfaces shouldn't feel like static pixel grids; they should respond with weight, inertia, and spatial continuity."
      },
      {
        title: "Complexity Concealed",
        desc: "Deep engineering logic under the hood, wrapped in brutalist minimalism and zero-friction clarity."
      },
      {
        title: "Performance as Aesthetic",
        desc: "Smooth 60fps frame rates, instant response times, and sub-100ms API roundtrips are non-negotiable visual aesthetics."
      }
    ],
    stats: [
      { label: "Projects Shipped", value: "18+" },
      { label: "Code Commits", value: "2,400+" },
      { label: "Tech Stack Mastery", value: "12 Node Types" },
      { label: "System Uptime", value: "99.99%" }
    ]
  },

  projects: [
    {
      id: "aether-os",
      title: "AETHER OS",
      tagline: "Spatial Web Operating System with canvas window management",
      category: "Developer Tools",
      year: "2026",
      status: "STABLE v2.4",
      featured: true,
      image: "/images/project-aether.jpg",
      description: "A browser-native spatial desktop environment featuring glassmorphic windows, WebGL acceleration, and real-time state sync across workspace nodes.",
      problem: "Traditional browser windows are rigid and disconnected, forcing developers into context switching across tab graveyards.",
      solution: "Engineered a spatial canvas windowing engine using Canvas API, Framer Motion inertia, and WebGL shader effects to offer infinite fluid workspace cards.",
      result: "Reduced tab-switch overhead by 40% in user benchmarks and achieved 60fps rendering across 20+ active windows.",
      techStack: ["Next.js 14", "TypeScript", "WebGL", "Framer Motion", "Tailwind CSS", "Zustand"],
      githubUrl: "https://github.com/saruhasan/aether-os",
      liveUrl: "https://aether-os-demo.vercel.app",
      metrics: [
        { label: "Frame Rate", value: "60 FPS" },
        { label: "Memory Overhead", value: "< 45 MB" }
      ]
    },
    {
      id: "synapse-ai",
      title: "SYNAPSE AI",
      tagline: "Autonomous multi-agent LLM orchestration platform",
      category: "AI / Systems",
      year: "2025",
      status: "PRODUCTION",
      featured: true,
      image: "/images/project-synapse.jpg",
      description: "Visual node-based agent pipeline designer that compiles multi-step LLM workflows into fault-tolerant distributed async graphs.",
      problem: "Building multi-agent reasoning loops with vector search context retrieval required boilerplate code prone to rate-limiting and state corruption.",
      solution: "Created an interactive DAG execution graph with real-time stream tracing, automatic fallback retry policies, and vector database embeddings.",
      result: "Processed over 500k automated workflow executions with a 99.8% completion reliability rate.",
      techStack: ["Python", "FastAPI", "Next.js", "Node Graph API", "PostgreSQL", "Redis"],
      githubUrl: "https://github.com/saruhasan/synapse-ai",
      liveUrl: "https://synapse-ai-platform.vercel.app",
      metrics: [
        { label: "Throughput", value: "850 op/s" },
        { label: "Latency", value: "25 ms" }
      ]
    },
    {
      id: "hyperflow",
      title: "HYPERFLOW TELEMETRY",
      tagline: "Ultra-low latency distributed system monitoring dashboard",
      category: "Full-Stack",
      year: "2025",
      status: "ACTIVE",
      featured: true,
      image: "/images/project-hyperflow.jpg",
      description: "High-throughput streaming metrics dashboard with sub-millisecond latency heatmaps and automated anomaly detection.",
      problem: "DevOps teams lack instant visual clarity when tracing distributed microservice latency spikes across global edge nodes.",
      solution: "Architected a WebSockets + Web Workers streaming pipeline with customized canvas chart rendering to visualize 100k events/sec.",
      result: "Enabled instant root-cause identification in complex microservice topologies under high stress.",
      techStack: ["React 19", "TypeScript", "Node.js", "WebSockets", "TimescaleDB", "Tailwind"],
      githubUrl: "https://github.com/saruhasan/hyperflow-telemetry",
      liveUrl: "https://hyperflow-demo.vercel.app",
      metrics: [
        { label: "Event Ingest", value: "100k/s" },
        { label: "Render Lag", value: "< 8 ms" }
      ]
    }
  ] as Project[],

  skills: {
    nodes: [
      {
        id: "react",
        name: "React 19 / Next.js",
        category: "Frontend",
        level: 5,
        x: 48,
        y: 28,
        connections: ["ts", "tailwind", "node", "framer"],
        description: "Server Components, App Router, Concurrent Mode, and Custom Hooks architecture."
      },
      {
        id: "ts",
        name: "TypeScript",
        category: "Frontend",
        level: 5,
        x: 25,
        y: 35,
        connections: ["react", "node", "python"],
        description: "Strict static typing, generative generics, type algebra, and enterprise AST transformations."
      },
      {
        id: "tailwind",
        name: "Tailwind / CSS Math",
        category: "Frontend",
        level: 5,
        x: 72,
        y: 32,
        connections: ["react", "framer"],
        description: "Custom design systems, CSS variables, glassmorphism, responsive editorial grid layouts."
      },
      {
        id: "framer",
        name: "Framer Motion / Motion",
        category: "Frontend",
        level: 5,
        x: 65,
        y: 55,
        connections: ["react", "tailwind"],
        description: "Scroll physics, layout morphing, spring inertia animations, and gestures."
      },
      {
        id: "node",
        name: "Node.js / Express",
        category: "Backend",
        level: 5,
        x: 40,
        y: 58,
        connections: ["react", "postgres", "redis", "ts"],
        description: "Asynchronous microservices, WebSocket streaming, REST API design, performance profiling."
      },
      {
        id: "postgres",
        name: "PostgreSQL / SQL",
        category: "Systems & DB",
        level: 4,
        x: 28,
        y: 75,
        connections: ["node", "redis"],
        description: "Query optimization, indexing strategies, ACID transaction management, relational schemas."
      },
      {
        id: "redis",
        name: "Redis Caching",
        category: "Systems & DB",
        level: 4,
        x: 52,
        y: 78,
        connections: ["node", "postgres"],
        description: "In-memory data structures, pub/sub event broadcasting, session management."
      },
      {
        id: "python",
        name: "Python / AI Tools",
        category: "AI & Tools",
        level: 4,
        x: 18,
        y: 55,
        connections: ["ts", "node"],
        description: "FastAPI, LLM orchestration, PyTorch data transformations, automated agent workflows."
      },
      {
        id: "docker",
        name: "Docker / CI/CD",
        category: "Systems & DB",
        level: 4,
        x: 78,
        y: 72,
        connections: ["node", "postgres"],
        description: "Containerization, multi-stage builds, GitHub Actions pipelines, Vercel edge deployment."
      }
    ] as TechNode[],
    principles: [
      {
        icon: "Cpu",
        title: "Deterministic Architecture",
        desc: "State flows in one direction; side-effects are isolated; failure states are predictable and recoverable."
      },
      {
        icon: "Layers",
        title: "Spatial Micro-Interactions",
        desc: "Every interaction gives visual & physical tactile feedback without overwhelming usability."
      },
      {
        icon: "Zap",
        title: "Sub-100ms Responsiveness",
        desc: "Optimized bundle sizes, zero layout shift, and instant feedback loops."
      }
    ]
  },

  now: {
    status: "SYSTEM OPERATIONAL",
    uptime: "100%",
    currentLocation: "Bengaluru, IN (IST UTC+5:30)",
    currentlyBuilding: {
      title: "Interactive 4-Panel Asymmetric Spatial Engine",
      desc: "Fine-tuning scroll-driven continuous physical panel expansion mechanics for Next.js.",
      progress: 94
    },
    currentlyLearning: [
      "Advanced Distributed Systems (Raft Consensus, Eventual Consistency)",
      "WebGL Shader Shading & Custom Particle Canvas Physics",
      "Rust Memory Management & WebAssembly Interop"
    ],
    exploring: [
      "AI x Spatial User Interfaces",
      "Local-First Software Architecture & CRDTs",
      "Generative Editorial Layout Systems"
    ],
    recentLogs: [
      { time: "2026-08-15 20:45", msg: "Refactored Framer Motion scroll transform interpolation curve" },
      { time: "2026-08-15 18:30", msg: "Generated asset preview mockups for Aether OS & Synapse AI" },
      { time: "2026-08-15 15:10", msg: "Optimized HTML5 canvas node connection renderer for 60fps" }
    ]
  },

  contact: {
    email: "saruhasan.dev@gmail.com",
    github: "https://github.com/saruhasan",
    linkedin: "https://linkedin.com/in/saruhasan",
    twitter: "https://x.com/saruhasan_dev"
  }
};
