import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; slideKey: string };
type State = { error: Error | null };

export class SlideErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("[SlideErrorBoundary]", this.props.slideKey, error, info);
  }

  componentDidUpdate(prev: Props) {
    if (prev.slideKey !== this.props.slideKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-bege text-preto">
          <div className="max-w-xl space-y-4 p-12 text-center">
            <p className="eyebrow">slide com problema · {this.props.slideKey}</p>
            <p className="font-display text-6xl">tudo bem.</p>
            <p className="text-lg opacity-70">aperta → pra continuar.</p>
            <p className="font-mono text-xs opacity-40">{this.state.error.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
