import { Link } from "react-router-dom";
import { buttonClasses } from "@/components/ui/Button";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";

const pillars = [
  { title: "Intervo Prep", description: "Read view, PPT view, flash cards, mind maps and revision sheets for every topic." },
  { title: "Intervo AI", description: "AI mentor, AI doubt solver and AI mock interviews tailored to your target role." },
  { title: "Intervo Resume", description: "AI-reviewed, ATS-optimized resumes built for the interviews you're prepping for." },
];

export function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-[var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">
          Prepare Smarter.{" "}
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Get Hired Faster.
          </span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Intervo is the AI-powered interview preparation platform for IT professionals — starting with Java,
          Spring Boot and Backend Development.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/signup" className={buttonClasses("primary", "lg")}>Get started free</Link>
          <Link to="/prep" className={buttonClasses("ghost", "lg")}>Explore Prep</Link>
        </div>
      </div>

      <div className="mt-20 grid gap-6 sm:grid-cols-3">
        {pillars.map((pillar) => (
          <Card key={pillar.title}>
            <CardBody>
              <CardTitle>{pillar.title}</CardTitle>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{pillar.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
