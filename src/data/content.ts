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
import logoPostgreSQL from "../assets/logos/postgresql.png";
import logoLookerStudio from "../assets/logos/looker-studio.png";

export type LanguageKey = "fr" | "en";

export type SkillItem = { name: string; detail?: string };
export type SkillGroup = { category: string; intro?: string; items: SkillItem[] };

export type NavItem = { to: string; label: string };

export type HomeMetricKey = "projectCount" | "stackCount" | "pipelineCount";
export type HomeMetric = { label: string; valueKey: HomeMetricKey };

export type Labels = {
  nav: {
    items: NavItem[];
    downloadCv: string;
    openMenu: string;
    closeMenu: string;
    language: {
      switchTo: string;
      aria: string;
    };
  };
  home: {
    availability: string;
    primaryCta: string;
    secondaryCta: string;
    metricsTitle: string;
    metricsSubtitle: string;
    aboutTitle: string;
    languagesTitle: string;
    softSkillsTitle: string;
    interestsTitle: string;
    metrics: HomeMetric[];
  };
  experience: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    showMore: string;
    showLess: string;
    empty: string;
    lightbox: {
      close: string;
      prev: string;
      next: string;
    };
  };
  projectCard: {
    openGallery: string;
    roleLabel: string;
    durationLabel: string;
    stackLabel: string;
    impactLabel: string;
    deliverablesLabel: string;
    viewProject: string;
  };
  filterBar: {
    all: string;
    tooltip: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  certifications: {
    title: string;
    subtitle: string;
    empty: string;
    view: string;
  };
  education: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    headline: string;
    intro: string;
    searchTitle: string;
    searchBody: string;
    emailLink: string;
    phoneLink: string;
  };
  contactForm: {
    name: string;
    email: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submitIdle: string;
    submitSending: string;
    success: string;
    error: string;
    fallback: string;
  };
  footer: {
    madeWith: string;
    rights: string;
  };
  theme: {
    system: string;
    light: string;
    dark: string;
    buttonLabel: string;
  };
};

import type {
  Profile,
  Experience,
  Education,
  Cert,
  Project,
} from "../types/types";

export type PortfolioContent = {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  certifications: Cert[];
  projects: Project[];
  skills: SkillGroup[];
  labels: Labels;
  pipelinesCount: number;
};

const frenchContent: PortfolioContent = {
  profile: {
    name: "Ange-Francine FORKOU",
    title: "Data Engineer & Développeuse BI",
    tagline: "J’industrialise les flux de données et je livre des dashboards actionnables.",
    bio: "Je construis des pipelines robustes, j’architecture la donnée pour les métiers et je transforme les indicateurs en décisions. Mon terrain de jeu : Databricks, Power BI et les environnements cloud.",
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
    softSkills: [
      "Bon relationnel",
      "Esprit d'analyse",
      "Leadership bienveillant",
      "Autonomie et sens du delivery",
    ],
    interests: ["Technologie", "Entrepreneuriat & leadership", "Bénévolat"],
  },
  experiences: [
    {
      company: "Caisse Nationale des Allocations Familiales (CNAF)",
      location: "Rennes, FR",
      title: "Alternance - Data Engineer / Développeuse applicative BI",
      period: "Sept. 2024 - Présent",
      bullets: [
        "Je reconçois le tableau de bord national des réclamations avec Databricks (Python, Spark) et Power BI.",
        "J’automatise les transformations avec des jobs CI/CD et je publie des indicateurs clés consommés par les métiers de la CAF.",
        "J’épaule les analystes en optimisant des notebooks et des requêtes",
        "Je travaille sur un POC d'implémentation de l'interface Databricks One dans l'environnement CNAF-métiers.",
      ],
      tech: ["Databricks", "Python", "Spark", "Power BI", "Azure", "Azure DevOps", "Git"],
    },
    {
      company: "Orange",
      location: "Rennes, FR",
      title: "Stage - Ingénieure Logiciel",
      period: "Fév. 2024 - Août 2024",
      bullets: [
        "Je co-construis un portail de visualisation de données de réseaux (FastAPI + Vue.js) pour suivre l’état des fibres optiques.",
        "Je développe des APIs Python et des jobs Kubernetes afin d’injecter les données dans MongoDB.",
        "Je pilote la qualité logicielle via GitLab CI, SonarQube et des revues de code quotidiennes.",
      ],
      tech: ["FastAPI", "Vue.js", "TypeScript", "MongoDB", "Kubernetes", "GitLab CI", "SonarQube"],
    },
  ],
  education: [
    {
      school: "EPSI, Rennes",
      degree: "Mastère spécialisé - Expert en ingénierie des données",
      period: "Sept. 2024 - Présent",
    },
    {
      school: "IUSJ - UTT",
      degree: "Diplôme d’ingénieur - Développement logiciel",
      period: "2019 - 2024",
      details: "Architecture des SI, Modélisation et Data viz (Power BI)",
    },
    {
      school: "UTBM, Belfort",
      degree: "Semestre d’échange - Développement logiciel avancé",
      period: "Sept. 2023 - Fév. 2024",
      details: "Bases de données, gestion de projet agile",
    },
  ],
  certifications: [
    {
      name: "IBM Data Analyst Professional Certificate",
      issuer: "IBM / Coursera",
      link: "https://www.coursera.org/account/accomplishments/specialization/WQ2GLB46L5M6",
    },
    {
      name: "Dataiku Core Designer",
      issuer: "Dataiku",
      link: "http://verify.skilljar.com/c/z6p5zxzj6ped",
    },
    {
      name: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      link: "https://learn.microsoft.com/certifications/power-bi-data-analyst-associate/",
    },
    {
      name: "Databricks for Data Engineering",
      issuer: "Databricks",
      link: "https://partner-academy.databricks.com/learn/courses/2469/get-started-with-databricks-for-data-engineering?hash=a4c6e6e8910eb43f6d827a874387454de05a5584&generated_by=880806",
    },
  ],
  projects: [
    {
      name: "Tableau de bord des réclamations",
      org: "CNAF - Alternance",
      role: "Data Engineer et référente BI",
      period: "2024 - 2025",
      summary:
        "Je refonds le suivi national des réclamations en redéfinissant le modèle de données, les KPIs et les parcours utilisateurs pour les directions territoriales.",
      bullets: [
        "Je reconstruis le data mart sur Delta Lake et j’automatise les jobs Databricks.",
        "Je modélise et publie un espace Power BI gouverné avec des mesures DAX réutilisables.",
      ],
      cover: cnafDashboard,
      gallery: [cnafDashboard, cnafAnalyse],
      stack: ["Databricks", "Spark", "Python", "Power BI", "Azure"],
      link: cnafDashboard,
    },
    {
      name: "Analyse de données e-commerce",
      org: "EPSI - M1",
      role: "Data Analyst projet de groupe",
      period: "2024 - 2025",
      summary:
        "Nous construisons un data lake Hadoop pour comprendre les ventes et proposer des leviers marketing à partir de jeux de données massifs.",
      bullets: [
        "Je pilote l’ingestion et la préparation des données (Hadoop, Spark, MapReduce).",
        "Je formalise des KPI ventes et des recommandations marketing dans un playbook.",
        "Je restitue les apprentissages via un rapport interactif et une soutenance dirigée.",
      ],
      cover: schoolProjectOne,
      stack: ["Hadoop", "Spark", "MapReduce"],
      link: "https://www.canva.com/design/DAGfjcpth5M/lAgCMBD_27AWh9dLE6yY7g/edit?utm_content=DAGfjcpth5M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
      name: "Pipeline Big Data pour un labo",
      org: "EPSI - M1",
      role: "Lead Data Engineer",
      period: "2024 - 2025",
      summary:
        "Je pilote la création d’un pipeline bout en bout pour consolider la R&D d’un laboratoire, de l’ingestion à la visualisation Looker Studio.",
      bullets: [
        "Je dessine l’orchestration Airflow et les transformations dbt/Spark.",
        "Je modélise la base PostgreSQL et je sécurise les exports Looker Studio.",
        "Je mets en place une documentation vivante et une CI légère sur GitLab.",
      ],
      cover: schoolProjectTwo,
      gallery: [schoolProjectTwo, schoolProjectTwoOne],
      stack: ["Python", "Spark", "Airflow", "LookerStudio", "Dbt", "PostgreSQL"],
      link: "https://www.canva.com/design/DAGqzNY5xKY/9o3BTlrJ3Ax-Hc3CJfh6rw/edit",
    },
  ],
  skills: [
    {
      category: "Solutions livrées",
      intro: "Ce que je mets en production pour les équipes métier.",
      items: [
        {
          name: "Tableaux de bord Power BI",
          detail: "Du cadrage KPI à la publication et à la gouvernance des espaces.",
        },
        {
          name: "Pipelines Databricks",
          detail: "Jobs planifiés, qualité de données et monitoring SLA sur Spark/Python.",
        },
        {
          name: "Data marts analytiques",
          detail: "Modélisation dimensionnelle et exposition SQL ou API pour les métiers.",
        },
        {
          name: "Automatisations CI/CD",
          detail: "Workflows Azure DevOps et GitLab pour fiabiliser les mises en production.",
        },
      ],
    },
    {
      category: "Technologies et outils",
      intro: "Les stacks que je pilote au quotidien.",
      items: [
        { name: "Databricks", detail: "Delta Lake, notebooks collaboratifs et jobs assurés." },
        { name: "Spark", detail: "Optimisation des transformations batch et streaming." },
        { name: "Python", detail: "Dataframes, tests PySpark et packaging outillé." },
        { name: "Power BI", detail: "Modélisation DAX, Power Query et paramètres dynamiques." },
        { name: "Airflow", detail: "Orchestration CI/CD et senseurs multi-sources." },
        { name: "Dbt", detail: "Modularisation SQL et documentation automatique." },
        { name: "Azure", detail: "Storage, Data Factory et DevOps pour le monitoring." },
        { name: "Docker", detail: "Environnements reproductibles pour notebooks et APIs." },
        { name: "PostgreSQL", detail: "Modèles dimensionnels et vues matérialisées." },
        { name: "LookerStudio", detail: "Diffusion rapide des analyses marketing." },
        { name: "Hadoop", detail: "Traitements distribués pour les gros volumes." },
        { name: "MapReduce", detail: "Algorithmes custom pour les agrégations massives." },
      ],
    },
  ],
  labels: {
    nav: {
      items: [
        { to: "/", label: "Accueil" },
        { to: "/experience", label: "Expériences" },
        { to: "/projects", label: "Projets" },
        { to: "/skills", label: "Compétences" },
        { to: "/certifications", label: "Certifications" },
        { to: "/education", label: "Formation" },
        { to: "/contact", label: "Contact" },
      ],
      downloadCv: "Mon CV",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      language: {
        switchTo: "EN",
        aria: "Passer le site en anglais",
      },
    },
    home: {
      availability: "À l’écoute d’opportunités",
      primaryCta: "Voir mes projets",
      secondaryCta: "Me contacter",
      metricsTitle: "Mon aventure en chiffres",
      metricsSubtitle: "Quelques indicateurs qui illustrent mon parcours.",
      aboutTitle: "À propos de moi",
      languagesTitle: "Langues",
      softSkillsTitle: "Atouts",
      interestsTitle: "Centres d’intérêt",
      metrics: [
        { label: "Projets réalisés", valueKey: "projectCount" },
        { label: "Stacks maîtrisées", valueKey: "stackCount" },
        { label: "Pipelines de données", valueKey: "pipelineCount" },
      ],
    },
    experience: {
      title: "Expériences professionnelles",
      subtitle: "Les missions clés qui ont façonné mon expertise.",
    },
    projects: {
      title: "Projets",
      subtitle: "Une sélection de mes réalisations.",
      showMore: "Voir plus de projets",
      showLess: "Voir moins de projets",
      empty: "Aucun projet ne correspond aux filtres sélectionnés.",
      lightbox: {
        close: "Fermer",
        prev: "Image précédente",
        next: "Image suivante",
      },
    },
    projectCard: {
      openGallery: "Ouvrir la galerie du projet",
      roleLabel: "Rôle",
      durationLabel: "Durée",
      stackLabel: "Stack",
      impactLabel: "Impact",
      deliverablesLabel: "Livrables clés",
      viewProject: "Voir le projet",
    },
    filterBar: {
      all: "Tout",
      tooltip: "Filtrer : {{tech}}",
    },
    skills: {
      title: "Compétences",
      subtitle: "Ce que je livre et les stacks que je pilote.",
    },
    certifications: {
      title: "Certifications",
      subtitle: "Preuves de mon apprentissage continu.",
      empty: "Aucune certification renseignée pour le moment.",
      view: "Voir le certificat",
    },
    education: {
      title: "Formation",
      subtitle: "Mes fondations académiques.",
    },
    contact: {
      title: "Contact",
      subtitle: "Parlons data, produits et impact concret.",
      headline: "Discutons de vos projets",
      intro:
        "J’aime co-construire des produits data utiles et pilotables. Une idée de dashboard, un pipeline à fiabiliser ou une question sur la gouvernance de la donnée ? Je serais ravie d’en discuter.",
      searchTitle: "Ce que je cherche",
      searchBody:
        "Collaborations data engineering ou BI où je peux livrer un résultat mesurable : alternance, missions freelance ou ateliers d’accélération sur vos pipelines et tableaux de bord.",
      emailLink: "Écrire un email",
      phoneLink: "Appeler",
    },
    contactForm: {
      name: "Nom",
      email: "Email",
      subject: "Sujet (optionnel)",
      subjectPlaceholder: "Sujet",
      message: "Message",
      messagePlaceholder: "Votre message...",
      submitIdle: "Envoyer",
      submitSending: "Envoi...",
      success: "Message envoyé avec succès !",
      error: "Une erreur est survenue.",
      fallback: "Impossible d’envoyer le message.",
    },
    footer: {
      madeWith: "Fait avec du café, React et Tailwind CSS.",
      rights: "© {{year}} {{name}}. Tous droits réservés.",
    },
    theme: {
      system: "Système",
      light: "Clair",
      dark: "Sombre",
      buttonLabel: "Changer le thème — actuel : {{label}}",
    },
  },
  pipelinesCount: 5,
};

const englishContent: PortfolioContent = {
  profile: {
    name: "Ange-Francine FORKOU",
    title: "Data Engineer & BI Developer",
    tagline: "I streamline data pipelines and deliver actionable dashboards.",
    bio: "I build resilient pipelines, model data for business teams, and turn metrics into decisions. My playground: Databricks, Power BI, and cloud ecosystems.",
    location: "Ille-et-Vilaine, France",
    email: "francineforkou@gmail.com",
    phone: "+33 6 95 27 78 30",
    linkedin: "https://www.linkedin.com/in/forkou-francine",
    github: "https://github.com/Forkou-francine",
    medium: "https://medium.com/@francineforkou",
    cvUrl: "https://drive.google.com/file/d/1YsF6baPAIC5nL4vwzLBciB5JSYT6jE_K/view?usp=sharing",
    heroPhoto,
    languages: [
      { name: "French", level: "Native" },
      { name: "English", level: "C1+ (TOEIC 950/990, BULATS 98/100)" },
    ],
    softSkills: [
      "Business-friendly communication",
      "Product-minded data culture",
      "Empathetic leadership",
      "Autonomy & delivery focus",
    ],
    interests: ["Technology", "Entrepreneurship & leadership", "Volunteering"],
  },
  experiences: [
    {
      company: "Caisse Nationale des Allocations Familiales (CNAF)",
      location: "Rennes, FR",
      title: "Apprenticeship - Data Engineer / BI Application Developer",
      period: "Sept. 2024 - Present",
      bullets: [
        "Redesigned the national complaints dashboard using Databricks (Python, Spark) and Power BI.",
        "Automated transformations and exposed SLA metrics consumed by 15 regional directorates.",
        "Coached analysts by tuning notebooks and queries while steering the backlog in Azure DevOps.",
        "Hardened operations with CI/CD pipelines and shared Git governance.",
      ],
      tech: ["Databricks", "Python", "Spark", "Power BI", "Azure", "Azure DevOps", "Git"],
    },
    {
      company: "Orange",
      location: "Rennes, FR",
      title: "Internship - Software Engineer",
      period: "Feb. 2024 - Aug. 2024",
      bullets: [
        "Co-built a network visualisation portal (FastAPI + Vue.js) to monitor optical fibre health.",
        "Developed Python APIs and Kubernetes jobs to feed MongoDB datasets.",
        "Maintained code quality with GitLab CI, SonarQube, and daily peer reviews.",
      ],
      tech: ["FastAPI", "Vue.js", "TypeScript", "MongoDB", "Kubernetes", "GitLab CI", "SonarQube"],
    },
  ],
  education: [
    {
      school: "EPSI, Rennes",
      degree: "Master's degree - Data Engineering Expert",
      period: "Sept. 2024 - Present",
    },
    {
      school: "IUSJ - UTT",
      degree: "Engineering degree - Software Development",
      period: "2019 - 2024",
      details: "Information systems architecture, data visualisation (Power BI)",
    },
    {
      school: "UTBM, Belfort",
      degree: "Exchange semester - Advanced Software Development",
      period: "Sept. 2023 - Feb. 2024",
      details: "Databases, agile project management",
    },
  ],
  certifications: frenchContent.certifications,
  projects: [
    {
      name: "National Complaints Dashboard",
      org: "CNAF - Apprenticeship",
      role: "Data Engineer & BI Lead",
      period: "2024 - 2025",
      summary:
        "Redesigned the complaints monitoring platform, refreshing the data model, KPIs, and user journeys for territorial teams.",
      bullets: [
        "Rebuilt the data mart on Delta Lake and automated Databricks jobs.",
        "Modelled and published a governed Power BI workspace with reusable DAX measures.",
        "Delivered an operations runbook and SLA alerts integrated with Azure DevOps.",
      ],
      cover: cnafDashboard,
      gallery: [cnafDashboard, cnafAnalyse],
      stack: ["Databricks", "Spark", "Python", "Power BI", "Azure"],
      link: cnafDashboard,
    },
    {
      name: "E-commerce Data Analysis",
      org: "EPSI - M1",
      role: "Data Analyst (team project)",
      period: "2024 - 2025",
      summary:
        "Built an Hadoop-based data lake to understand sales patterns and recommend marketing levers from large datasets.",
      bullets: [
        "Led data ingestion and preparation workflows (Hadoop, Spark, MapReduce).",
        "Formalised sales KPIs and marketing recommendations in a playbook.",
        "Shared insights through an interactive report and a guided presentation.",
      ],
      cover: schoolProjectOne,
      stack: ["Hadoop", "Spark", "MapReduce"],
      link: "https://www.canva.com/design/DAGfjcpth5M/lAgCMBD_27AWh9dLE6yY7g/edit?utm_content=DAGfjcpth5M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
      name: "Big Data Pipeline for a Lab",
      org: "EPSI - M1",
      role: "Lead Data Engineer",
      period: "2024 - 2025",
      summary:
        "Led the end-to-end pipeline for a laboratory, from ingestion to Looker Studio dashboards supporting R&D squads.",
      bullets: [
        "Designed Airflow orchestration and dbt/Spark transformations.",
        "Modelled the PostgreSQL warehouse and secured Looker Studio exports.",
        "Set up living documentation and lightweight CI on GitLab.",
      ],
      cover: schoolProjectTwo,
      gallery: [schoolProjectTwo, schoolProjectTwoOne],
      stack: ["Python", "Spark", "Airflow", "LookerStudio", "Dbt", "PostgreSQL"],
      link: "https://www.canva.com/design/DAGqzNY5xKY/9o3BTlrJ3Ax-Hc3CJfh6rw/edit",
    },
  ],
  skills: [
    {
      category: "Delivered solutions",
      intro: "What I ship and maintain for business teams.",
      items: [
        {
          name: "Power BI dashboards",
          detail: "From KPI scoping to workspace publishing and governance.",
        },
        {
          name: "Databricks pipelines",
          detail: "Scheduled jobs, data quality and SLA monitoring on Spark/Python.",
        },
        {
          name: "Analytical data marts",
          detail: "Dimensional modelling and SQL/API exposure for stakeholders.",
        },
        {
          name: "CI/CD automations",
          detail: "Azure DevOps and GitLab workflows to secure releases.",
        },
      ],
    },
    {
      category: "Technologies & tooling",
      intro: "Stacks I operate every day.",
      items: [
        { name: "Databricks", detail: "Delta Lake, collaborative notebooks, and dependable jobs." },
        { name: "Spark", detail: "Optimising batch and streaming transformations." },
        { name: "Python", detail: "Dataframes, PySpark testing, and packaging best practices." },
        { name: "Power BI", detail: "DAX modelling, Power Query, and dynamic parameters." },
        { name: "Airflow", detail: "CI/CD orchestration and multi-source sensors." },
        { name: "Dbt", detail: "Modular SQL transformations and automatic documentation." },
        { name: "Azure", detail: "Storage, Data Factory, and DevOps monitoring." },
        { name: "Docker", detail: "Reproducible environments for notebooks and APIs." },
        { name: "PostgreSQL", detail: "Dimensional schemas and materialised views." },
        { name: "LookerStudio", detail: "Fast dissemination of marketing insights." },
        { name: "Hadoop", detail: "Distributed processing for large volumes." },
        { name: "MapReduce", detail: "Custom aggregation algorithms at scale." },
      ],
    },
  ],
  labels: {
    nav: {
      items: [
        { to: "/", label: "Home" },
        { to: "/experience", label: "Experience" },
        { to: "/projects", label: "Projects" },
        { to: "/skills", label: "Skills" },
        { to: "/certifications", label: "Certifications" },
        { to: "/education", label: "Education" },
        { to: "/contact", label: "Contact" },
      ],
      downloadCv: "Download CV",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: {
        switchTo: "FR",
        aria: "Switch the site to French",
      },
    },
    home: {
      availability: "Open to opportunities",
      primaryCta: "View my projects",
      secondaryCta: "Get in touch",
      metricsTitle: "My journey in numbers",
      metricsSubtitle: "A few metrics that illustrate the impact I deliver.",
      aboutTitle: "About me",
      languagesTitle: "Languages",
      softSkillsTitle: "Strengths",
      interestsTitle: "Interests",
      metrics: [
        { label: "Projects delivered", valueKey: "projectCount" },
        { label: "Stacks operated", valueKey: "stackCount" },
        { label: "Data pipelines", valueKey: "pipelineCount" },
      ],
    },
    experience: {
      title: "Professional experience",
      subtitle: "Assignments that shaped my expertise.",
    },
    projects: {
      title: "Projects",
      subtitle: "A selection of my work.",
      showMore: "Show more projects",
      showLess: "Show fewer projects",
      empty: "No project matches the selected filters.",
      lightbox: {
        close: "Close",
        prev: "Previous image",
        next: "Next image",
      },
    },
    projectCard: {
      openGallery: "Open the project gallery",
      roleLabel: "Role",
      durationLabel: "Duration",
      stackLabel: "Stack",
      impactLabel: "Impact",
      deliverablesLabel: "Key deliverables",
      viewProject: "View project",
    },
    filterBar: {
      all: "All",
      tooltip: "Filter: {{tech}}",
    },
    skills: {
      title: "Skills",
      subtitle: "What I deliver and the stacks I run.",
    },
    certifications: {
      title: "Certifications",
      subtitle: "Proof of continuous learning.",
      empty: "No certification listed yet.",
      view: "View certificate",
    },
    education: {
      title: "Education",
      subtitle: "Where I built my foundations.",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk data, products, and measurable impact.",
      headline: "Let's discuss your projects",
      intro:
        "I love co-designing data products that business teams rely on. Need a dashboard, a reliable pipeline, or advice on data governance? I'm happy to help.",
      searchTitle: "What I'm looking for",
      searchBody:
        "Data engineering or BI collaborations where I can drive measurable outcomes: apprenticeship missions, freelance projects, or fast-track workshops on pipelines and dashboards.",
      emailLink: "Send an email",
      phoneLink: "Call",
    },
    contactForm: {
      name: "Name",
      email: "Email",
      subject: "Subject (optional)",
      subjectPlaceholder: "Subject",
      message: "Message",
      messagePlaceholder: "Your message...",
      submitIdle: "Send",
      submitSending: "Sending...",
      success: "Message successfully sent!",
      error: "Something went wrong.",
      fallback: "Unable to send the message.",
    },
    footer: {
      madeWith: "Powered by coffee, React and Tailwind CSS.",
      rights: "© {{year}} {{name}}. All rights reserved.",
    },
    theme: {
      system: "System",
      light: "Light",
      dark: "Dark",
      buttonLabel: "Switch theme — current: {{label}}",
    },
  },
  pipelinesCount: 5,
};

const contentByLanguage: Record<LanguageKey, PortfolioContent> = {
  fr: frenchContent,
  en: englishContent,
};

export function getContent(language: LanguageKey): PortfolioContent {
  return contentByLanguage[language] ?? contentByLanguage.fr;
}

export const colors = {
  primaryFrom: "from-violet-600",
  primaryTo: "to-indigo-600",
  softFrom: "from-fuchsia-50",
  softTo: "to-indigo-50",
  ring: "focus:ring-violet-600",
};

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
  PostgreSQL: logoPostgreSQL,
  LookerStudio: logoLookerStudio,
};
