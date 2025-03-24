import React from 'react';

export class ErrorBoundaryProvider extends React.Component<
  React.PropsWithChildren<{ fallback: React.ReactNode }>
> {
  state: Readonly<{ hasError: boolean }>;

  constructor(props: React.PropsWithChildren<{ fallback: React.ReactNode }>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error(' error:', error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.log(' info:', info);
    console.log(' error:', error);
    // logErrorToMyService(
    //   error,
    //   // Example "componentStack":
    //   //   in ComponentThatThrows (created by App)
    //   //   in ErrorBoundary (created by App)
    //   //   in div (created by App)
    //   //   in App
    //   info.componentStack,
    //   // Only available in react@canary.
    //   // Warning: Owner Stack is not available in production.
    //   React.captureOwnerStack(),
    // );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}