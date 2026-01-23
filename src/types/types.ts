export type Profile = {
  name: string; title: string; tagline: string; bio: string;
  location: string; email: string; phone: string;
  linkedin: string; github: string; medium: string; cvUrl?: string;
  languages: { name: string; level: string }[];
  softSkills: string[]; interests: string[];
  heroPhoto: string;
};

export type Experience = {
  company: string; location: string; title: string; period: string;
  bullets: string[]; tech: string[];
};

export type Education = {
  school: string; degree: string; period: string; details?: string;
};

export type Cert = { name: string; issuer: string; year?: string; id?: string; link?: string; image?: string };

export type Project = {
  name: string;
  org: string;
  period: string;
  role: string;
  summary: string;
  bullets: string[];
  cover?: string;
  gallery?: string[];
  stack: string[];
  link?: string;
};
