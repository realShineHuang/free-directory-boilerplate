'use client';

import React from 'react';
import { Button } from './ui/button';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold">出错了</h2>
          <p className="text-muted-foreground">
            {this.state.error?.message || '发生了一个错误，请稍后再试'}
          </p>
          <Button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          >
            重试
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
} 