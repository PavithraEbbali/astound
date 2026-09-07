// Make react-three-fiber's three.js elements (group, mesh, ambientLight, …)
// known to TypeScript's JSX checker under both the legacy and React 19 namespaces.
import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
