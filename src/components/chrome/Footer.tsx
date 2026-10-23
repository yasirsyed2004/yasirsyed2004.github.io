import { Container } from "@/components/ui/Container";
import { education } from "@/data/experience";
import { footer, profile, socialLinks } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line py-6">
      <Container className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-h3 font-semibold text-ink">
            {profile.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-meta text-ink-muted">
            {profile.title} · {profile.location}
          </p>
          <p className="mt-1 text-meta text-ink-faint">
            {education.institution}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <ul className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  // Inline padding: a bigger touch target, same line box.
                  className="py-1 text-meta text-ink-muted transition-colors hover:text-accent"
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { rel: "noopener noreferrer", target: "_blank" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-meta text-ink-faint">{footer.copyright}</p>
        </div>
      </Container>

      <Container className="mt-4">
        <p className="text-meta text-ink-faint">{footer.note}</p>
      </Container>
    </footer>
  );
}
