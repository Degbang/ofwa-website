import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  failed: boolean;
}

/** Last line of defence: a render error shows a plain recovery page instead of a blank screen. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" style={{ maxWidth: 560, margin: '20vh auto', padding: '0 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2.4rem' }}>Something went wrong.</h1>
        <p style={{ margin: '20px 0 28px', lineHeight: 1.7 }}>
          The page failed to load. Reloading usually fixes it. If it keeps happening, write to{' '}
          <a href="mailto:info@ofwafrica.org">info@ofwafrica.org</a>.
        </p>
        <a className="btn" href="/">
          Back to the homepage
        </a>
      </div>
    );
  }
}
