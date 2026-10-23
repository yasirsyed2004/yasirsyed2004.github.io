/**
 * Allowed tags for the polymorphic UI primitives.
 *
 * These deliberately do NOT use React's `ElementType`. React Three Fiber
 * augments the global JSX namespace with every three.js element, which widens
 * `ElementType` to the point where TypeScript can no longer resolve the props
 * of `<Tag />` and collapses them to `never`. A closed union of the tags we
 * actually use keeps these components fully typed.
 */
export type PolymorphicTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "ul"
  | "ol";
