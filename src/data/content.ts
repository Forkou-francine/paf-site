import heroPhoto from "../assets/ange1.jpg";
import cnafDashboard from "../assets/projects/projet2-cc.png";
import cnafAnalyse from "../assets/projects/project2.png";
import schoolProjectOne from "../assets/projects/project1.png";
import schoolProjectTwo from "../assets/projects/project3.png";
import schoolProjectTwoOne from "../assets/projects/ae.png";

import logoDatabricks from "../assets/logos/databricks.png";
import logoSpark from "../assets/logos/spark.png";
import logoPython from "../assets/logos/python.png";
import logoPowerBI from "../assets/logos/powerbi.png";
import logoAzure from "../assets/logos/azure.png";
import logoHadoop from "../assets/logos/hadoop.png";
import logoMap from "../assets/logos/map.jpeg";
import logoAirflow from "../assets/logos/airflow.png";
import logoDbt from "../assets/logos/Dbt.png";
import logoDocker from "../assets/logos/Docker.png";


export type Cert = { 
  name: string; 
  issuer: string; 
  year?: string; 
  id?: string; 
  link?: string; 
  image?: string };

export type Project = { 
  name: string; org: string; 
  period: string; bullets: string[]; 
  cover?: string; stack: string[]; 
  link?: string; gallery?: string[] };

export type Language = { 
  name: string; level: string };

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  medium: string;
  cvUrl: string;
  heroPhoto: string;           
  languages: Language[];       
  softSkills: string[];        
  interests: string[];         
};


export const colors = {
  primaryFrom: "from-violet-600",
  primaryTo: "to-indigo-600",
  softFrom: "from-fuchsia-50",
  softTo: "to-indigo-50",
  ring: "focus:ring-violet-600",
};

export const profile = {
  name: "Ange Francine FORKOU",
  title: "Data Engineer · Développeuse BI",
  tagline: "Exploratrice de données et créatrice de pipelines intelligents.",
  bio: "Hello ! Je suis Ange, et je transforme le chaos des données brutes en insights clairs et percutants. Ce portfolio est ma vitrine numérique.",
  location: "Ille-et-Vilaine, France",
  email: "francineforkou@gmail.com",
  phone: "+33 6 95 27 78 30",
  linkedin: "https://www.linkedin.com/in/forkou-francine",
  github: "https://github.com/Forkou-francine",
  medium: "https://medium.com/@francineforkou",
  cvUrl: "https://drive.google.com/file/d/1YsF6baPAIC5nL4vwzLBciB5JSYT6jE_K/view?usp=sharing",
  heroPhoto,
  languages: [
    { name: "Français", level: "Courant" },
    { name: "Anglais", level: "C1+ (TOEIC 950/990, BULATS 98/100)" },
  ],
  softSkills: ["Bon relationnel", "Rigueur et discipline", "Esprit d'analyse", "Autonomie"],
  interests: ["Technologie", "Entrepreneuriat & leadership", "Bénévolat"],
};

export const experiences = [
  {
    company: "Caisse Nationale des Allocations Familiales (CNAF)",
    location: "Rennes, FR",
    title: "Alternance – Data Engineer / Développeuse applicative BI",
    period: "Sept. 2024 — Présent",
    bullets: [
      "Refonte d’un tableau de bord analytique des réclamations (Databricks Python/Spark) + intégration Power BI.",
      "Assistance utilisateurs à travers l'optimisation de notebooks",
      "Transformation de données brutes en indicateurs clés ; modélisation dimensionnelle dans Azure Storage.",
      "Collaboration MOA/AMOA ; maintenance CI/CD via Azure DevOps et Git.",
    ],
    tech: ["Databricks", "Python", "Spark", "Power BI", "Azure", "Azure DevOps", "Git"],
  },
  {
    company: "Orange",
    location: "Rennes, FR",
    title: "Stage – Ingénieure Logiciel",
    period: "Fév. 2024 — Août 2024",
    bullets: [
      "Visualisation de données réseaux (transport optique).",
      "APIs avec Python (FastAPI) & front TypeScript (Vue.js).",
      "Admin NoSQL (MongoDB) ; CI/CD GitLab + SonarQube.",
    ],
    tech: ["FastAPI", "Vue.js", "TypeScript", "MongoDB", "Kubernetes", "GitLab CI", "SonarQube"],
  },
];

export const education = [
  { school: "EPSI, Rennes", degree: "Mastère Spécialisé – Expert en Ingénierie des Données", period: "Sept. 2024 — Présent" },
  { school: "IUSJ × UTT", degree: "Diplôme d’ingénieur – Développement Logiciel", period: "2019 — 2024", details: "Architecture SI, data viz (Power BI)" },
  { school: "UTBM, Belfort", degree: "Semestre d’échange – Dev logiciel avancé", period: "Sept. 2023 — Fév. 2024", details: "Bases de données, gestion de projet agile" },
];

export const certifications: Cert[] = [
  { name: "IBM Data Analyst Professional Certificate", issuer: "IBM / Coursera", link: "https://www.coursera.org/account/accomplishments/specialization/WQ2GLB46L5M6" },
  { name: "Dataiku Core Designer", issuer: "Dataiku", link: "http://verify.skilljar.com/c/z6p5zxzj6ped" },
  { name: "Microsoft Certified: Power BI Data Analyst Associate", issuer: "Microsoft", link: "https://learn.microsoft.com/certifications/power-bi-data-analyst-associate/" },
  { name: "Databricks for Data Engineering", issuer: "Databricks", link: "https://partner-academy.databricks.com/learn/courses/2469/get-started-with-databricks-for-data-engineering?hash=a4c6e6e8910eb43f6d827a874387454de05a5584&generated_by=880806" },
];

export const projects: Project[] = [
  {
    name: "Tableau de bord des réclamations",
    org: "CNAF – Alternance",
    period: "2024 — 2025",
    bullets: [
      "Modélisation & pipeline ETL (Databricks · Spark · Python).",
      "Mesures DAX & modèles Power BI.",
      "Suivi des SLA, typologies & délais de traitement.",
    ],
    cover: cnafDashboard,
    gallery: [cnafDashboard, cnafAnalyse],
    stack: ["Databricks", "Spark", "Python", "Power BI", "Azure"],
    link: "#",
  },
  {
    name: "Analyse de données e-commerce",
    org: "EPSI – M1",
    period: "2024 — 2025",
    bullets: [
      "Ingestion & préparation (Hadoop · Spark · MapReduce).",
      "Exploration & KPI de ventes.",
      "Recommandations marketing.",
    ],
    cover: schoolProjectOne,
    stack: ["Hadoop", "Spark", "MapReduce"],
    link: "https://www.canva.com/design/DAGfjcpth5M/lAgCMBD_27AWh9dLE6yY7g/edit?utm_content=DAGfjcpth5M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
  {
    name: "Pipeline Big Data pour un labo",
    org: "EPSI – M1",
    period: "2024 — 2025",
    bullets: [
      "Orchestration Airflow, transformations dbt & Spark.",
      "Modélisation PostgreSQL & reporting Looker Studio.",
      "CI légère & documentation.",
    ],
    cover: schoolProjectTwo,
    gallery: [schoolProjectTwo, schoolProjectTwoOne],
    stack: ["Python", "Spark", "Airflow", "LookerStudio", "Dbt", "PostgreSQL"],
    link: "https://www.canva.com/design/DAGqzNY5xKY/9o3BTlrJ3Ax-Hc3CJfh6rw/edit",
  },
];

// logos pour Skills
export const techLogos: Record<string, string> = {
  Databricks: logoDatabricks,
  Spark: logoSpark,
  Python: logoPython,
  "Power BI": logoPowerBI,
  Azure: logoAzure,
  Hadoop: logoHadoop,
  MapReduce: logoMap,
  Airflow: logoAirflow,
  Dbt: logoDbt,
  Docker: logoDocker,
};

export const skills = [
  { category: "Orchestration & Monitoring", items: ["Airflow", "Prometheus", "Grafana"] },
  { category: "ETL & Data Viz", items: ["Power BI", "Tableau", "Dataiku", "Databricks", "Hadoop", "Azure Storage"] },
  { category: "Langages & Frameworks", items: ["Python", "Spark", "Java", "Scala"] },
  { category: "Bases de données", items: ["SQL", "NoSQL", "Cassandra", "MongoDB"] },
  { category: "CI/CD & Ops", items: ["Docker", "Kubernetes", "GitLab CI", "Azure DevOps"] },
];
