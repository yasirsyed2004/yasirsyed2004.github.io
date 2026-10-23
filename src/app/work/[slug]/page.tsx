import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/Tag";
import { getProject, projects } from "@/data/projects";
import { isDev, isTodo } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const impactReady = !isTodo(project.impact);

  const body: { heading: string; text: string }[] = [
    { heading: "The problem", text: project.problem },
    { heading: "The approach", text: project.approach },
    ...(impactReady ? [{ heading: "The impact", text: project.impact }] : []),
  ];

  return (
    <article className="pt-14 pb-section-sm md:pb-section">
      <Container>
        <Link
          className="text-meta text-ink-muted transition-colors hover:text-accent"
          href="/#work"
        >
          ← All work
        </Link>

        <header className="mt-4 max-w-measure">
          <p className="text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
            {project.period}
          </p>
          <h1 className="mt-2 text-h2 font-semibold text-ink">
            {project.title}
          </h1>
          <p className="mt-2 text-lead text-ink-muted">{project.role}</p>
          <p className="mt-3 text-lead text-ink">{project.summary}</p>
          <TagList className="mt-4" items={project.stack} label="Stack" />
        </header>
      </Container>

      <Container className="mt-6">
        <div className="overflow-hidden rounded-card border border-line">
          <Image
            alt=""
            className="w-full"
            height={750}
            priority
            src={project.cover}
            unoptimized
            width={1200}
          />
        </div>
      </Container>

      <Container className="mt-8">
        <div className="max-w-measure space-y-6">
          {body.map((block) => (
            <section key={block.heading}>
              <h2 className="text-h3 font-semibold text-ink">
                {block.heading}
              </h2>
              <p className="mt-2 text-lead text-ink-muted">{block.text}</p>
            </section>
          ))}

          {isDev && !impactReady ? (
            <p className="rounded-card border border-accent/40 bg-accent/10 p-2 text-meta text-accent">
              dev only — {project.impact}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex max-w-measure flex-wrap gap-2 border-t border-line pt-6">
          {project.links.live ? (
            <Button external href={project.links.live}>
              Visit live site
            </Button>
          ) : null}
          {project.links.repo ? (
            <Button external href={project.links.repo} variant="secondary">
              View repository
            </Button>
          ) : null}
          <Button href="/#work" variant="ghost">
            ← Back to all work
          </Button>
        </div>
      </Container>
    </article>
  );
}
