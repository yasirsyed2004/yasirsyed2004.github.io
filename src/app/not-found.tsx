import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-svh flex-col justify-center py-section-sm">
      <p className="text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-2 text-h2 font-semibold text-ink">
        That page doesn&rsquo;t exist.
      </h1>
      <p className="mt-3 max-w-measure text-lead text-ink-muted">
        The link may be out of date. Everything worth reading is on the
        home page.
      </p>
      <div className="mt-5">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  );
}
