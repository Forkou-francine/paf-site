import heroPhoto from "../assets/ange1.jpg";
import cnafDashboard from "../assets/projects/tb-reclam.jpeg";
import cnafAnalyse from "../assets/projects/project2.png";
import schoolProjectOne from "../assets/projects/project1.png";
import schoolProjectTwo from "../assets/projects/project3.png";
import schoolProjectTwoOne from "../assets/projects/ae.png";
import fintechPipeline from "../assets/projects/fintech.png";
import fintechArchi from "../assets/projects/fintech-archi.png";
import fintechDashboard from "../assets/projects/fintech-dashboard.png";
import fintechTable from "../assets/projects/fintech-table.png";


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
    aboutText: string;
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
    name: "Ange Francine FORKOU",
    title: "Data Engineer & Développeuse BI",
    tagline: "Je transforme des millions de lignes en tableaux de bord que les gens utilisent vraiment.",
    bio: "En alternance à la CNAF, je conçois les pipelines de données et dashboards qui aident 101 caisses d'allocations familiales à piloter leurs réclamations. Databricks, PySpark, Power BI, Azure : c'est mon quotidien depuis 2 ans.",
    location: "Ille-et-Vilaine, France",
    email: "francineforkou@gmail.com",
    phone: "+33 6 95 27 78 30",
    linkedin: "https://www.linkedin.com/in/forkou-francine",
    github: "https://github.com/Forkou-francine",
    medium: "https://medium.com/@francineforkou",
    cvUrl: "/CV_Data_Francine_FORKOU.pdf",
    heroPhoto,
    languages: [
      { name: "Français", level: "Courant" },
      { name: "Anglais", level: "C1+ (TOEIC 950/990, BULATS 98/100)" },
    ],
    softSkills: [
      "Je sais expliquer - J'ai formé des utilisateurs métier à mes dashboards",
      "Je livre - Mes pipelines tournent en prod tous les mois depuis 1 an",
      "Je collabore - 5 ans déléguée de classe, ça laisse des traces",
      "Je traduis — Les besoins métier en requêtes SQL et dashboards lisibles",
    ],
    interests: ["Technologie & veille data", "Entrepreneuriat", "Bénévolat"],
  },
  experiences: [
    {
      company: "Caisse Nationale des Allocations Familiales (CNAF)",
      location: "Rennes, FR",
      title: "Alternance - Data Engineer / Développeuse d'applicatifs BI",
      period: "Sept. 2024 - Sept. 2026",
      bullets: [
        "Refonte du système national de suivi des réclamations : conception et déploiement d'un tableau de bord Power BI utilisé par 101 CAF et 500 utilisateurs, en remplacement d'une application SAS obsolète.",
        "Développement de pipelines ETL sous Databricks (PySpark) traitant plusieurs millions de réclamations/an avec une architecture Medallion (Bronze/Silver/Gold).",
        "Orchestration de 6 notebooks via Databricks Workflows avec un temps d'exécution optimisé à 7 minutes en batch mensuel.",
        "Implémentation de la gouvernance des données via Unity Catalog et stockage sur Delta Lake / Azure Storage.",
        // "Création d'un tableau de bord pour le pilotage des Services d'Aide à Domicile, consolidant les données de financeurs multiples (CAF, Départements, CPAM).",
        "Revue et standardisation de notebooks Python/Spark existants : amélioration des performances et respect des bonnes pratiques.",
        "Réalisation d'un POC Databricks AI/BI (Genie Room) : évaluation des capacités de requêtage en langage naturel, recommandations adoptées par l'équipe.",
        "Collaboration avec les équipes MOA/AMOA ; versioning et maintenance des pipelines via Git (Azure DevOps).",
      ],
      tech: ["Databricks", "Python", "Spark", "Power BI", "Azure", "Unity Catalog", "Delta Lake", "Azure DevOps", "Git"],
    },
    {
      company: "Orange",
      location: "Cesson-Sévigné, FR",
      title: "Stage - Ingénieur Logiciel",
      period: "Fév. 2024 - Août 2024",
      bullets: [
        "Développement d'une solution de visualisation de données réseaux de transport optique : API Python (FastAPI) et TypeScript (Vue.js) pour créer des dashboards interactifs.",
        "Administration de bases de données NoSQL (MongoDB) sur clusters Kubernetes (Linux).",
        "Mise en place de pipelines CI/CD via GitLab CI et SonarQube pour le contrôle qualité.",
      ],
      tech: ["FastAPI", "Vue.js", "TypeScript", "MongoDB", "Kubernetes", "GitLab CI", "SonarQube"],
    },
  ],
  education: [
    {
      school: "EPSI, Rennes",
      degree: "Mastère spécialisé - Expert en ingénierie des données",
      period: "Sept. 2024 - Présent",
      details: "Pipelines de données, Big Data, Data Viz, Gouvernance, Green IT",
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
      details: "Bases de données (SQL, NoSQL), Gestion de projet Agile, Java",
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
        "J'ai repris un système vieillissant sous SAS pour le reconstruire sur Databricks + Power BI. Aujourd'hui, 101 CAF l'utilisent chaque mois.",
      bullets: [
        "Reconstruction du data mart sur Delta Lake avec automatisation des jobs Databricks",
        "Modélisation et publication d'un espace Power BI avec des mesures DAX réutilisables",
        "Documentation et formation des utilisateurs finaux",
      ],
      cover: cnafDashboard,
      gallery: [cnafDashboard, cnafAnalyse],
      stack: ["Databricks", "Spark", "Python", "Power BI"],
      link: cnafDashboard,
      videoUrl: "https://www.loom.com/share/b2131ab6daba43808221329698323a9e"
    },
    {
      name: "Pipeline de qualité des données Fintech",
      org: "Projet personnel",
      role: "Data Engineer",
      period: "2025",
      summary:
        "Pipeline end-to-end qui ingère des transactions financières simulées, les transforme avec dbt, valide leur qualité avec Great Expectations, orchestre le tout avec Airflow, et expose un dashboard de monitoring.",
      bullets: [
        "Génération de 10 000 transactions synthétiques avec anomalies contrôlées (2% NULL, 3% suspects, 0.5% fraudes)",
        "Modélisation dbt en 3 couches (staging, intermediate, marts) avec tests de qualité déclaratifs",
        "7 règles de validation Great Expectations couvrant complétude, cohérence et anomalies",
        "Orchestration Airflow via Docker : DAG quotidien de 4 tâches séquentielles",
        "Dashboard Streamlit interactif avec score de qualité global et drill-down par catégorie",
      ],
      cover: fintechDashboard,
      gallery: [fintechDashboard, fintechTable, fintechPipeline, fintechArchi],
      stack: ["Python", "Dbt", "Airflow", "DuckDB", "Streamlit", "Docker"],
      link: "https://github.com/Forkou-francine/fintech-data-quality-pipeline",
    },
    {
      name: "Analyse de données e-commerce",
      org: "EPSI - M1",
      role: "Data Analyst projet de groupe",
      period: "2024 - 2025",
      summary:
        "Projet de groupe : construction d'un data lake Hadoop pour analyser les ventes d'une plateforme e-commerce et proposer des recommandations marketing.",
      bullets: [
        "Ingestion et préparation des données avec Hadoop, Spark et MapReduce",
        "Formalisation des KPIs ventes et recommandations dans un playbook marketing",
        "Restitution via rapport interactif et soutenance",
      ],
      cover: schoolProjectOne,
      stack: ["Hadoop", "Spark"],
      link: "https://www.canva.com/design/DAGfjcpth5M/lAgCMBD_27AWh9dLE6yY7g/edit?utm_content=DAGfjcpth5M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
      name: "Pipeline Big Data pour un labo",
      org: "EPSI - M1",
      role: "Lead Data Engineer",
      period: "2024 - 2025",
      summary:
        "Création d'un pipeline de bout en bout pour consolider les données R&D d'un laboratoire, de l'ingestion à la visualisation dans Looker Studio.",
      bullets: [
        "Architecture de l'orchestration Airflow et transformations dbt/Spark",
        "Modélisation de la base PostgreSQL et sécurisation des exports Looker Studio",
        "Documentation vivante et CI légère sur GitLab",
      ],
      cover: schoolProjectTwo,
      gallery: [schoolProjectTwo, schoolProjectTwoOne],
      stack: ["Python", "Spark", "Airflow", "LookerStudio", "Dbt"],
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
          detail: "Jobs planifiés, qualité de données et monitoring.",
        },
        {
          name: "Data marts analytiques",
          detail: "Modélisation dimensionnelle et architecture Medallion",
        },
        {
          name: "Formation utilisateurs",
          detail: "Ateliers et documentation pour ~100 utilisateurs métier",
        },
      ],
    },
    {
      category: "Technologies et outils",
      intro: "Les stacks que je pilote au quotidien.",
      items: [
        { name: "Databricks", detail: "Delta Lake, notebooks collaboratifs et jobs assurés." },
        { name: "Spark", detail: "Optimisation des transformations batch et streaming." },
        { name: "Python", detail: "Mon langage principal : scripts, notebooks, APIs" },
        { name: "Power BI", detail: "Modélisation DAX, Power Query; Je conçois des dashboards utilisés par des centaines de personnes" },
        { name: "Airflow", detail: "Orchestration CI/CD et senseurs multi-sources -  utilisé sur un projet académique" },
        { name: "Dbt", detail: "En cours d'apprentissage pour mes projets perso" },
        { name: "Azure", detail: "Storage, Data Factory et DevOps pour le monitoring." },
        { name: "Docker", detail: "Environnements reproductibles pour notebooks et APIs." },
        { name: "Hadoop", detail: "Utilisé en contexte académique (HDFS, écosystème)" },
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
      metricsTitle: "Ce que j'ai livré",
      metricsSubtitle: "Quelques résultats concrets.",
      aboutTitle: "À propos de moi",
      aboutText: "Camerounaise, ingénieure, et passionnée de données. J'ai grandi à Yaoundé, étudié l'informatique entre le Cameroun et la France ( Belfort, Rennes), et découvert la data un peu par hasard — lors d'un cours de Data Mining en 3ème année. Ce qui m'a accrochée : le côté concret. Quand je livre un dashboard, je vois des gens s'en servir pour prendre des décisions. C'est cette boucle \"données → décision → impact\" qui me motive.",
      languagesTitle: "Langues",
      softSkillsTitle: "Atouts",
      interestsTitle: "Centres d’intérêt",
      metrics: [
        { label: "Projets réalisés", valueKey: "projectCount" },
        { label: "Technologies utilisées", valueKey: "stackCount" },
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
      deliverablesLabel: "Livrables clés",
      viewProject: "Voir le projet",
    },
    filterBar: {
      all: "Tout",
      tooltip: "Filtrer : {{tech}}",
    },
    skills: {
      title: "Compétences",
      subtitle: "Ce que je livre et les outils que j'utilise.",
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
        "Un CDI en Data Engineering ou BI à partir de novembre 2026, idéalement à Lyon. En attendant, ouverte aux ateliers d'accélération sur vos pipelines et tableaux de bord.",
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
      madeWith: "Fait avec du café 😊, React et Tailwind CSS.",
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
    name: "Ange Francine FORKOU",
    title: "Data Engineer & BI Developer",
    tagline: "I turn millions of rows into dashboards people actually use.",
    bio: "Currently in a work-study program at CNAF, I design data pipelines and dashboards that help 101 French family allowance offices manage their complaints. Databricks, PySpark, Power BI, Azure — that's been my daily stack for 2 years. And I document everything I learn along the way.",
    location: "Ille-et-Vilaine, France",
    email: "francineforkou@gmail.com",
    phone: "+33 6 95 27 78 30",
    linkedin: "https://www.linkedin.com/in/forkou-francine",
    github: "https://github.com/Forkou-francine",
    medium: "https://medium.com/@francineforkou",
    cvUrl: "/cv-ange-francine-forkou.pdf",
    heroPhoto,
    languages: [
      { name: "French", level: "Native" },
      { name: "English", level: "C1+ (TOEIC 950/990, BULATS 98/100)" },
    ],
    softSkills: [
      "I translate — Business needs into SQL queries and readable dashboards",
      "I dig deep — I don't let go of a bug until I understand the why",
      "I deliver — My pipelines have been running in prod monthly for 1 year",
      "I share — I've trained 100 business users on my tools",
    ],
    interests: ["Technology & data trends", "Entrepreneurship", "Volunteering"],
  },
  experiences: [
    {
      company: "Caisse Nationale des Allocations Familiales (CNAF)",
      location: "Rennes, FR",
      title: "Apprenticeship - Data Engineer / BI Application Developer",
      period: "Sept. 2024 - Sept. 2026",
      bullets: [
        "Complete overhaul of the national complaints tracking system: replaced an aging SAS application with a Power BI dashboard used by 101 CAF offices and 500+ users",
        "Developed ETL pipelines on Databricks (PySpark) — millions of complaints processed yearly, Medallion architecture (Bronze/Silver/Gold)",
        "Orchestrated 4 notebooks with Databricks Workflows: monthly execution optimized to 5-7 minutes",
        "Implemented data governance: Unity Catalog for access control, Delta Lake for storage, Azure Storage for persistence",
        // "Created a second dashboard to monitor Home Care Services (SAAD), consolidating data from multiple funders (CAF, Departments, CPAM)",
        "Trained business users on dashboard adoption — workshops, documentation, support",
        "Reviewed and standardized existing Python/Spark notebooks: performance optimization, best practices",
        "Databricks AI/BI POC (Genie Room): tested natural language querying capabilities, wrote recommendations adopted by the team",
        "Daily collaboration with MOA/AMOA teams; Git versioning via Azure DevOps",
      ],
      tech: ["Databricks", "Python", "Spark", "Power BI", "Azure", "Unity Catalog", "Delta Lake", "Azure DevOps", "Git"],
    },
    {
      company: "Orange",
      location: "Cesson-Sévigné, FR",
      title: "Internship - Software Engineer",
      period: "Feb. 2024 - Aug. 2024",
      bullets: [
        "Developed a data visualization app for optical transport networks: Python API (FastAPI) backend, TypeScript (Vue.js) frontend",
        "Administered MongoDB databases on Kubernetes clusters in a Linux environment",
        "Set up CI/CD pipelines with GitLab CI and quality control via SonarQube",
      ],
      tech: ["FastAPI", "Vue.js", "TypeScript", "MongoDB", "Kubernetes", "GitLab CI", "SonarQube"],
    },
  ],
  education: [
    {
      school: "EPSI, Rennes",
      degree: "Master's degree - Data Engineering Expert",
      period: "Sept. 2024 - Present",
      details: "Data pipelines, Big Data, Data Viz, Governance, Green IT",
    },
    {
      school: "IUSJ (Cameroon) × UTT (France)",
      degree: "Engineering degree - Software Development",
      period: "2019 - 2024",
      details: "Information systems architecture, data visualisation (Power BI)",
    },
    {
      school: "UTBM, Belfort",
      degree: "Exchange semester - Advanced Software Development",
      period: "Sept. 2023 - Feb. 2024",
      details: "Databases (SQL, NoSQL), Agile Project Management, Java",
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
        "I took over an aging SAS system and rebuilt it entirely on Databricks + Power BI. Today, 101 CAF offices use it every month to track their complaints.",
      bullets: [
        "Rebuilt the data mart on Delta Lake with automated Databricks jobs",
        "Modeled and published a Power BI workspace with reusable DAX measures",
        "Documentation and end-user training",
      ],
      cover: cnafDashboard,
      gallery: [cnafDashboard, cnafAnalyse],
      stack: ["Databricks", "Spark", "Python", "Power BI"],
      link: cnafDashboard,
    },
    {
      name: "Fintech Data Quality Pipeline",
      org: "Personal project",
      role: "Data Engineer",
      period: "2025",
      summary:
        "End-to-end pipeline that ingests simulated financial transactions, transforms them with dbt, validates data quality with Great Expectations, orchestrates everything with Airflow, and exposes a monitoring dashboard.",
      bullets: [
        "Generated 10,000 synthetic transactions with controlled anomalies (2% NULL, 3% suspicious, 0.5% fraud)",
        "dbt modeling across 3 layers (staging, intermediate, marts) with declarative quality tests",
        "7 Great Expectations validation rules covering completeness, consistency, and anomalies",
        "Airflow orchestration via Docker: daily DAG with 4 sequential tasks",
        "Interactive Streamlit dashboard with global quality score and category drill-down",
      ],
      cover: fintechPipeline,
      stack: ["Python", "Dbt", "Airflow", "DuckDB", "Streamlit", "Docker"],
      link: "https://github.com/Forkou-francine/fintech-data-quality-pipeline",
    },
    {
      name: "E-commerce Data Analysis",
      org: "EPSI - Big Data Workshop",
      role: "Data Analyst (team project)",
      period: "2024 - 2025",
      summary:
        "Team project: built a Hadoop data lake to analyze e-commerce sales and propose marketing recommendations.",
      bullets: [
        "Data ingestion and preparation with Hadoop, Spark, and MapReduce",
        "Formalized sales KPIs and recommendations in a marketing playbook",
        "Delivered via interactive report and presentation",
      ],
      cover: schoolProjectOne,
      stack: ["Hadoop", "Spark"],
      link: "https://www.canva.com/design/DAGfjcpth5M/lAgCMBD_27AWh9dLE6yY7g/edit?utm_content=DAGfjcpth5M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
      name: "Big Data Pipeline for an R&D Lab",
      org: "EPSI - M1",
      role: "Lead Data Engineer",
      period: "2024 - 2025",
      summary:
        "Built an end-to-end pipeline to consolidate R&D data for a lab, from ingestion to Looker Studio visualization.",
      bullets: [
        "Designed Airflow orchestration and dbt/Spark transformations",
        "Modeled PostgreSQL database and secured Looker Studio exports",
        "Living documentation and lightweight CI on GitLab",
      ],
      cover: schoolProjectTwo,
      gallery: [schoolProjectTwo, schoolProjectTwoOne],
      stack: ["Python", "Spark", "Airflow", "LookerStudio", "Dbt"],
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
          detail: "From KPI scoping to workspace publishing and governance — dashboards used by hundreds of people",
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
        { name: "Airflow", detail: "Used on an academic project — still learning" },
        { name: "Dbt", detail: "Currently learning on personal projects"},
        { name: "Azure", detail: "Storage, Data Factory, and DevOps monitoring." },
        { name: "Docker", detail: "Reproducible environments for notebooks and APIs." },
        { name: "Hadoop", detail: "Distributed processing for large volumes." },
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
      metricsTitle: "What I've delivered",
      metricsSubtitle: "A few results that illustrate what I deliver.",
      aboutTitle: "About me",
      aboutText: "Cameroonian, engineer, and passionate about data. I grew up in Yaoundé, studied computer science between Cameroon and France (Belfort, Rennes), and discovered data almost by accident — during a Data Mining course in my third year. What hooked me: the tangible impact. When I deliver a dashboard, I see people use it to make decisions. That \"data → decision → impact\" loop is what drives me.",
      languagesTitle: "Languages",
      softSkillsTitle: "How I work",
      interestsTitle: "Interests",
      metrics: [
        { label: "Projects delivered", valueKey: "projectCount" },
        { label: "The tools I operate on", valueKey: "stackCount" },
        { label: "Data pipelines", valueKey: "pipelineCount" },
      ],
    },
    experience: {
      title: "Professional experience",
      subtitle: "Key assignments that shaped my expertise.",
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
      deliverablesLabel: "Key deliverables",
      viewProject: "View project",
    },
    filterBar: {
      all: "All",
      tooltip: "Filter: {{tech}}",
    },
    skills: {
      title: "Skills",
      subtitle: "What I deliver and the tools I use.",
    },
    certifications: {
      title: "Certifications",
      subtitle: "Proof of continuous learning.",
      empty: "No certification listed yet.",
      view: "View certificate",
    },
    education: {
      title: "Education",
      subtitle: "My academic foundations.",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk data, products, and measurable impact.",
      headline: "Let's discuss your projects",
      intro:
        "I love co-building data products that are useful. Need a dashboard, a reliable pipeline, or a question about data governance? I'd be happy to discuss.",
      searchTitle: "What I'm looking for",
      searchBody:
        "A permanent Data Engineering or BI position starting September 2026, ideally in Lyon. In the meantime, open to acceleration workshops on your pipelines and dashboards.",
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
      madeWith: "Powered by coffee 😊, React and Tailwind CSS.",
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
