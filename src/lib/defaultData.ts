import type { SiteData } from "./types";

export const defaultData: SiteData = {
  name: "Ahmed Zidan",
  title: "Full Stack Developer\nCreative Problem Solver",
  heroDescription:
    "I build fast, beautiful and scalable web experiences while constantly exploring cybersecurity, design, creativity and emerging technologies.",
  aboutDescription: [
    "I am a passionate Full Stack Developer with hands-on experience building modern web applications using Python, JavaScript, Node.js, HTML, CSS, and responsive design. I specialize in creating landing pages and portfolio websites that are fast, accessible, and visually compelling.",
    "Beyond development, I have a strong foundation in cybersecurity, networking, IP protocols, and tools like Kali Linux and Metasploit. I believe that understanding security makes me a better developer.",
    "When I'm not coding, I enjoy video editing with Adobe Premiere Pro, graphic design with Affinity Designer, watching cinema and films, and constantly learning new technologies. I speak English fluently and collaborate effectively across teams.",
  ],
  profileImage: "/images/profile.jpg",
  resumeUrl: "/resume.pdf",
  skills: [
    { name: "Python", icon: "python", category: "backend" },
    { name: "HTML", icon: "html", category: "frontend" },
    { name: "CSS", icon: "css", category: "frontend" },
    { name: "JavaScript", icon: "javascript", category: "frontend" },
    { name: "Node.js", icon: "nodejs", category: "backend" },
    { name: "Responsive Design", icon: "responsive", category: "frontend" },
    { name: "Cyber Security", icon: "security", category: "security" },
    { name: "Networking", icon: "network", category: "security" },
    { name: "Linux", icon: "linux", category: "other" },
    { name: "Premiere Pro", icon: "premiere", category: "design" },
    { name: "Affinity Designer", icon: "affinity", category: "design" },
    { name: "English", icon: "language", category: "other" },
  ],
  experience: [
    {
      id: "1",
      title: "Full Stack Developer",
      company: "Freelance",
      period: "2023 - Present",
      description:
        "Building modern web applications, landing pages, and portfolio websites for clients. Specializing in responsive design and performance optimization.",
    },
    {
      id: "2",
      title: "Web Development Intern",
      company: "Tech Solutions",
      period: "2022 - 2023",
      description:
        "Developed and maintained client websites. Collaborated on frontend architecture and implemented responsive designs.",
    },
  ],
  projects: [
    {
      id: "1",
      title: "Landing Page Pro",
      description:
        "High-converting landing page template with smooth animations and optimized performance.",
      image: "/images/project-1.svg",
      tags: ["HTML", "CSS", "JavaScript", "Animation"],
      liveUrl: "#",
    },
    {
      id: "2",
      title: "Portfolio Builder",
      description:
        "Dynamic portfolio website builder with customizable themes and CMS integration.",
      image: "/images/project-2.svg",
      tags: ["Next.js", "TypeScript", "Tailwind", "CMS"],
      liveUrl: "#",
    },
    {
      id: "3",
      title: "Dashboard UI Kit",
      description:
        "Modern admin dashboard with data visualization, dark mode, and responsive layout.",
      image: "/images/project-3.svg",
      tags: ["React", "TypeScript", "Tailwind", "Charts"],
      liveUrl: "#",
    },
    {
      id: "4",
      title: "Security Scanner",
      description:
        "Network security analysis tool with vulnerability scanning and reporting features.",
      image: "/images/project-4.svg",
      tags: ["Python", "Security", "Networking"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "5",
      title: "TaskFlow",
      description:
        "Collaborative task management app with real-time updates and team features.",
      image: "/images/project-5.svg",
      tags: ["Node.js", "React", "WebSocket", "MongoDB"],
      liveUrl: "#",
    },
    {
      id: "6",
      title: "SaaS Website",
      description:
        "Modern SaaS landing page with liquid glass design and premium animations.",
      image: "/images/project-6.svg",
      tags: ["Next.js", "Framer Motion", "Tailwind"],
      liveUrl: "#",
    },
  ],
  services: [
    {
      id: "1",
      title: "Web Development",
      description:
        "Fast, responsive, and scalable websites built with modern technologies.",
      icon: "code",
    },
    {
      id: "2",
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces with a focus on user experience and accessibility.",
      icon: "palette",
    },
    {
      id: "3",
      title: "Landing Pages",
      description:
        "High-converting landing pages optimized for performance and engagement.",
      icon: "target",
    },
    {
      id: "4",
      title: "Cyber Security",
      description:
        "Security assessments, vulnerability analysis, and network protection strategies.",
      icon: "shield",
    },
  ],
  creativeInterests: [
    "Video Editing with Adobe Premiere Pro",
    "Graphic Design with Affinity Designer",
    "Cinema & Films",
    "Learning New Technologies",
  ],
  contact: {
    email: "zidanv07@gmail.com",
    phone: "+201006158659",
    whatsapp: "https://wa.me/201006158659",
    location: "Egypt",
  },
  social: {
    instagram: "https://instagram.com/zidan__v7",
  },
};
