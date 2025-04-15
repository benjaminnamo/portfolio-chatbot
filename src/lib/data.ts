// Personal Information Types
export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Contact {
  email: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  phone?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  education: Education[];
  experience: WorkExperience[];
  projects: Project[];
  skills: Skill[];
  interests: string[];
  contact: Contact;
}

// Template portfolio data
export const templateInfo: PersonalInfo = {
  name: "Your Name",
  title: "Your Title",
  summary: "Write a brief summary about yourself here. Describe your passion, expertise, and what you're looking for.",
  education: [
    {
      institution: "University Name",
      degree: "Your Degree",
      field: "Your Field",
      startDate: "Year Started",
      endDate: "Year Ended",
      description: "Brief description of your education experience, courses, achievements, etc."
    }
  ],
  experience: [
    {
      company: "Company Name",
      position: "Your Position",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Brief description of your role and responsibilities.",
      achievements: [
        "Notable achievement 1",
        "Notable achievement 2",
        "Notable achievement 3"
      ]
    }
  ],
  projects: [
    {
      name: "Project Name",
      description: "Brief description of your project, its purpose, and impact.",
      technologies: ["Technology 1", "Technology 2", "Technology 3"],
      github: "https://github.com/yourusername/project"
    }
  ],
  skills: [
    {
      category: "Skill Category",
      items: ["Skill 1", "Skill 2", "Skill 3"]
    }
  ],
  interests: [
    "Interest 1",
    "Interest 2",
    "Interest 3"
  ],
  contact: {
    email: "your.email@example.com",
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername",
    portfolio: "https://yourportfolio.com",
    phone: "Your Phone Number"
  }
};

// Try to import personal info, fall back to template if not available
let personalInfo: PersonalInfo;

try {
  // Try to import from personal-data.ts (which will be gitignored)
  personalInfo = require('./personal-data').personalInfo;
} catch (error) {
  // Use template data if personal data is not available
  personalInfo = templateInfo;
  console.log('Using template data. To use your own data, create a personal-data.ts file.');
}

export { personalInfo };

// Message types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
