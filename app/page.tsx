"use client";

import { useState } from "react";
import LightPillar from "@/components/LightPillar";
import Reveal from "@/components/Reveal";
import BlurText from "@/components/BlurText";

const SOCIALS = {
  instagram: { label: "Instagram", handle: "@_xm8d", url: "https://instagram.com/_xm8d" },
  discord: { label: "Discord", handle: "i2anf_" },
  github: { label: "GitHub", handle: "anas2999454556", url: "https://github.com/anas2999454556" },
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(SOCIALS.discord.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-400" />
          anas
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</a>
          <a href="#skills" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Skills</a>
          <a href="#projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Projects</a>
          <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</a>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SOCIALS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            GitHub
          </a>
          <button
            onClick={copyDiscord}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {copied ? "Copied!" : SOCIALS.discord.handle}
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden" aria-label="Toggle menu">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-border px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#about" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">About</a>
            <a href="#skills" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Skills</a>
            <a href="#projects" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Projects</a>
            <a href="#contact" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Contact</a>
            <hr className="border-border" />
            <a href={SOCIALS.github.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground">GitHub</a>
            <button onClick={copyDiscord} className="rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-white">
              {copied ? "Copied!" : SOCIALS.discord.handle}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 h-full w-full">
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={0.9}
          rotationSpeed={0.3}
          glowAmount={0.006}
          pillarWidth={2.5}
          noiseIntensity={0.35}
          mixBlendMode="screen"
          quality="high"
        />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-16 text-center">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available for projects
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-x-4">
            <BlurText
              text="Hey, I'm"
              delay={80}
              direction="top"
              className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
            />
            <BlurText
              text="Anas"
              delay={80}
              direction="top"
              className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
            />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <BlurText
            text="I build web apps, scripts, and small tools. PHP, HTML, CSS, React JS, SQL, C and Python — whatever the project needs."
            animateBy="words"
            direction="top"
            delay={40}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
          />
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={SOCIALS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {SOCIALS.instagram.handle}
            </a>
            <a
              href="#projects"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-8 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              See my work
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SOCIALS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm8.25-11.25h.008v.008h-.008v-.008z" />
              </svg>
              {SOCIALS.instagram.label} · {SOCIALS.instagram.handle}
            </a>
            <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord · {SOCIALS.discord.handle}
            </button>
            <a
              href={SOCIALS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub · {SOCIALS.github.handle}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const SKILLS = [
  {
    name: "PHP",
    tagline: "Backend scripting",
    libraries: ["Laravel", "MySQL / PDO", "Composer"],
  },
  {
    name: "React JS",
    tagline: "Interactive UI",
    libraries: ["Next.js", "Redux", "React Router", "Hooks"],
  },
  {
    name: "JavaScript",
    tagline: "The web everywhere",
    libraries: ["Node.js", "Express", "ES6+", "Fetch / REST"],
  },
  {
    name: "HTML & CSS",
    tagline: "Markup & styling",
    libraries: ["Tailwind CSS", "Bootstrap", "SASS", "Responsive Layouts"],
  },
  {
    name: "Python",
    tagline: "Scripts & automation",
    libraries: ["Django", "Flask", "NumPy", "Pandas"],
  },
  {
    name: "SQL",
    tagline: "Data & databases",
    libraries: ["MySQL", "PostgreSQL", "SQLite", "Joins & Indexes"],
  },
  {
    name: "C",
    tagline: "Systems foundations",
    libraries: ["Pointers & Memory", "Data Structures", "File I/O"],
  },
  {
    name: "Git & Tools",
    tagline: "Everyday workflow",
    libraries: ["Git / GitHub", "CLI", "VS Code", "npm"],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <BlurText
              text="What I work with"
              animateBy="words"
              direction="top"
              delay={60}
              className="justify-center text-3xl font-bold tracking-tight sm:text-4xl"
            />
            <p className="mt-4 text-muted-foreground">
              The languages I know and the libraries I reach for with them.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-border p-6 transition-colors hover:border-primary/30 hover:bg-muted/50">
                <h3 className="mb-1 text-lg font-semibold">{skill.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{skill.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.libraries.map((lib) => (
                    <span
                      key={lib}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      {lib}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    name: "Wasabi Sushi & Hibachi",
    description:
      "Restaurant website for a sushi and hibachi grill, with menu, gallery, and location info.",
    tags: ["React", "Vite", "Framer Motion"],
    url: "https://wasabi-sushi-hibachi.vercel.app/",
  },
  {
    name: "SpotMusic",
    description:
      "Spotify-style music app that streams real tracks from the Jamendo API, with search, playlists, and a full playback UI.",
    tags: ["React", "Vite", "Jamendo API"],
    url: "https://spotmusic-sigma.vercel.app/",
  },
  {
    name: "Luna Nail Bar",
    description:
      "Website for a nail salon with services, pricing, and booking details.",
    tags: ["React", "Tailwind CSS", "GSAP"],
    url: "https://lunanailbar.vercel.app/",
  },
  {
    name: "EcoSite",
    description:
      "Online boutique for graduation gowns, with a product catalog, an order dashboard, and a Node.js backend.",
    tags: ["HTML/CSS", "JavaScript", "Node.js"],
    url: "https://github.com/anas2999454556/EcoSite-",
    linkLabel: "View on GitHub",
  },
  {
    name: "Raise The Roost",
    description:
      "Website for a chicken and biscuits restaurant serving fried chicken, tenders, sandwiches, and house-made sauces.",
    tags: ["React", "Vite"],
    url: "https://raise-you-roost.vercel.app/",
  },
];

function Projects() {
  return (
    <section id="projects" className="border-y border-border bg-muted/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <BlurText
              text="Projects"
              animateBy="words"
              direction="top"
              delay={60}
              className="justify-center text-3xl font-bold tracking-tight sm:text-4xl"
            />
            <p className="mt-4 text-muted-foreground">
              A few things I have designed, built, and shipped.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal
              key={project.name}
              delay={i * 80}
              className={i === PROJECTS.length - 1 ? "lg:col-start-2" : ""}
            >
              <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/30">
                <h3 className="mb-2 text-lg font-semibold">{project.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="mb-6 mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex h-10 w-fit items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  {project.linkLabel ?? "Visit site"}
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8m9 0v9" />
                  </svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="#home" className="flex items-center gap-2 text-lg font-bold">
            <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-primary to-purple-400" />
            anas
          </a>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href={SOCIALS.instagram.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              Instagram · {SOCIALS.instagram.handle}
            </a>
            <span>Discord · {SOCIALS.discord.handle}</span>
            <a href={SOCIALS.github.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Anas. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
