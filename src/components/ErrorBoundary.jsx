import React from "react";

/**
 * ErrorBoundary
 * Catches any render error in the component tree below it and shows a
 * friendly fallback instead of a blank screen. Wrap the root App with this.
 *
 * Must be a class component — React does not yet support error boundaries
 * as function components.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to an error tracking service (e.g. Sentry).
    console.error("Learn to Budget — uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>😬</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Something went wrong</h2>
          <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
            Try refreshing the page. If the problem keeps happening, let us know.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, message: "" })}
            style={{
              background: "#0f766e",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "12px 28px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
