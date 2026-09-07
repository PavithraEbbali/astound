"use client";

import { Component, type ReactNode } from "react";

/**
 * Catches any error from the lazy-loaded 3D scene (e.g. WebGL unavailable)
 * and renders nothing, so the hero's gradient fallback shows instead of the
 * whole page crashing.
 */
export default class SafeCanvas extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Intentionally silent: the 3D layer is decorative and optional.
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
