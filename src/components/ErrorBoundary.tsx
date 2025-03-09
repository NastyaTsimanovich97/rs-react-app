import { Component, ReactNode } from 'react';

interface IErrorBoundaryState {
  hasError: boolean;
}

interface IErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: object, errorInfo: object) {
    console.error(`Error: ${error}`);
    console.error(`Error Info: ${errorInfo}`);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
