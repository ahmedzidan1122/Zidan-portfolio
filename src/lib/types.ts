export interface SiteData {
  name: string;
  title: string;
  heroDescription: string;
  aboutDescription: string[];
  profileImage: string;
  resumeUrl: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  services: Service[];
  creativeInterests: string[];
  contact: Contact;
  social: Social;
}

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "design" | "security" | "other";
  level?: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Contact {
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
}

export interface Social {
  instagram: string;
  github?: string;
  linkedin?: string;
}
