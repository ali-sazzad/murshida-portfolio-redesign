// All copy, links and asset references carried over unchanged from the live portfolio.
// Base path support so the same build works on Vercel (/) and GitHub Pages (/repo).
const B = import.meta.env.BASE_URL.replace(/\/$/, "");

const SUPABASE_RESUME =
  "https://pdibanzzlkpzorvmmrmh.supabase.co/storage/v1/object/public/portfolio-assets/resume/resume-1791716086722-37gi587s5mu.pdf?v=1791716087543";

export const intro = {
  name: "MURSHIDA P.",
  role: "WEB DEVELOPER",
  skills: ["Astro", "React", "Tailwind CSS", "Supabase"],
  email: "murshidaprml@gmail.com",
  phone: "+91 62354 60019",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/murshida-p-6791aa321",
  resume: SUPABASE_RESUME,
  image: `${B}/img/profile.png`,
  paragraphs: [
    "I am a web developer with a BSc in Computer Science and professional experience working as a Junior Web Developer. I specialize in building modern, responsive, and interactive websites that combine strong visual design with clean, scalable, and reliable development.",
    "I enjoy turning ideas and design concepts into functional websites through thoughtful layouts, smooth interactions, and well-structured code.",
    "Alongside my work in web development, I am currently pursuing an MSc in Computer Science with a specialization in Data Analytics. I am committed to improving my skills, exploring modern technologies, and building web experiences that are both creative and practical.",
  ],
};

export const nav = [
  { href: `${B}/`, label: "Home" },
  { href: `${B}/about`, label: "About Me" },
  { href: `${B}/skills`, label: "Skills" },
  { href: `${B}/projects`, label: "Projects" },
  { href: `${B}/experience`, label: "Experience" },
  { href: `${B}/certifications`, label: "Certificates" },
];

export const education = [
  { title: "M.Sc Computer Science", place: "Pondicherry University", when: "Pursuing" },
  { title: "B.Sc Computer Science", place: "MES Ponnani College, University of Calicut", when: "2023-26" },
];

export const achievements = [
  "Startup Pitching Competition",
  "Best Outgoing Student of The Year 2025-26",
];

const A = `${B}/img/achievements/`;
export const gallery = [
  { title: "Google for Developers Al Bootcamp, Pondicherry University", image: A + "project-showcase.svg" },
  { title: "IEDC Summit'25 at LBS Engineering College, Kasaragod", image: A + "creative-coding.svg" },
  { title: "Huddle Global'24 at Kovalam, Trivandrum", image: A + "creative-coding.svg" },
  { title: "IEDC Summit'24 at NIT Calicut", image: A + "project-showcase.svg" },
  { title: "SIFHAMS International Conference 2026, Sharjah", image: A + "academic-excellence.svg" },
  { title: "Zerone'26, National Level Tech Fest", image: A + "community-contribution.svg" },
  { title: "Zerone 2025, National Level Tech Fest", image: A + "data-milestone.svg" },
  { title: "Young Innovators Programme, Majilis Arts & Science College", image: A + "web-award.svg" },
  { title: "Hackathon", image: A + "hackathon-finalist.svg" },
  { title: "Certification", image: A + "certification-path.svg" },
  { title: "Data Session", image: A + "data-milestone.svg" },
  { title: "Certification", image: A + "certification-path.svg" },
  { title: "sifhams international conference 2026", image: A + "academic-excellence.svg" },
  { title: "Hackathon", image: A + "hackathon-finalist.svg" },
  { title: "Web Workshop", image: A + "web-award.svg" },
  { title: "Community Work", image: A + "community-contribution.svg" },
];

export const skills = [
  { title: "HTML", icon: `${B}/img/skills/html.png` },
  { title: "CSS", icon: `${B}/img/skills/css.png` },
  { title: "JavaScript", icon: `${B}/img/skills/javascript.png` },
  { title: "Astro", icon: `${B}/img/skills/astro.png` },
  { title: "React", icon: `${B}/img/skills/react.png` },
  { title: "Git/GitHub", icon: `${B}/img/skills/git-github.png` },
  { title: "MongoDB", icon: `${B}/img/skills/mongodb.png` },
  { title: "PostgreSQL", icon: `${B}/img/skills/postgresql.png` },
  { title: "Bootstrap", icon: `${B}/img/skills/bootstrap.png` },
  { title: "Supabase", icon: `${B}/img/skills/supabase.png` },
  { title: "Next", icon: `${B}/img/skills/next.png` },
  { title: "Python", icon: `${B}/img/skills/python.png` },
  { title: "PHP", icon: `${B}/img/skills/php.png` },
  { title: "TypeScript", icon: `${B}/img/skills/typescript.png` },
];

export const projects = [
  {
    title: "Glow Connect Landing Page",
    description:
      "landing page for Glow Connect, a modern beauty marketplace platform that helps users discover verified salons, spas, and beauty professionals, book services, and connect directly with providers.",
    stack: ["Astro", "Tailwind CSS", "Node.js"],
    url: "glowconnect.in",
  },
];

export const experience = [
  {
    role: "Junior Web Developer",
    org: "TechnoTaLim Platform and Services LLP",
    when: "April 2026 - June 2026",
    points: [
      "Developed, debugged, tested and maintained web applications.",
      "Built responsive user interfaces based on requirements.",
      "Used Git/version control to manage and maintain project code.",
      "Communicated with leads.",
    ],
  },
  {
    role: "Python Intern",
    org: "Wogle Tech",
    when: "Feb 2025 - Apr 2025",
    points: [
      "Developed mini-projects using Python, including a gesturecontrolled smart board and a handwriting-to-text conversion tool.",
    ],
  },
  { role: "Women Entrepreneurship Wing Lead", org: "HI (Her Ideas), IEDC MESPNI", when: "Apr 2025 - Mar2026", points: [] },
  { role: "Assistant Content Creator", org: "IEDC MESPNI", when: "Apr 2024 - Mar 2025", points: [] },
  { role: "Associate Campus Ambassador", org: "YIP MESPNI", when: "Jun 2024 - Mar 2025", points: [] },
  {
    role: "Assistant Women Entrepreneurship Wing Lead",
    org: "HI (Her Ideas), IEDC MESPNI",
    when: "Jun 2023 - Mar 2024",
    points: [],
  },
  { role: "Campus Co-Lead", org: "MuLearn MESPNI", when: "", points: [] },
];

export const certificates = [
  "Python Internship",
  "Figma Workshop",
  "Python Using AI Workshop",
  "30 Day Using Python Al Program",
  "Foundations of Machine Learning",
  "Introduction to Back-End Development",
  "Introduction to Cybersecurity Careers",
  "Introduction to Game Design",
  "Introduction to Software Engineering",
  "Critical Thinking in the AI Era",
  "IEDC SUmmit 24",
];
