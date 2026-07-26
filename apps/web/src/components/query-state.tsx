import { HttpError } from "@react-workshop/http-client";
import { Button } from "@react-workshop/ui/button";

export type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  loadingLabel?: string;
  emptyLabel?: string;
  onRetry?: () => void;
};

export function resolveErrorMessage(error: Error | null | undefined): string {
  if (error instanceof HttpError && error.status) {
    return `Request failed with status ${error.status}. Please try again.`;
  }

  return "Something went wrong while loading this content.";
}

/**
 * Renders the shared loading / error / empty states and `null` once the caller
 * has data to show, so pages stay focused on their own layout.
 */
export function QueryState({
  emptyLabel = "Nothing to show here yet.",
  error,
  isEmpty = false,
  isError,
  isLoading,
  loadingLabel = "Loading...",
  onRetry
}: QueryStateProps) {
  if (isLoading) {
    return (
      <div className="grid place-items-center gap-4 py-20 text-center" role="status">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        <p className="text-muted">{loadingLabel}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid place-items-center gap-4 py-20 text-center" role="alert">
        <p className="font-medium text-danger">{resolveErrorMessage(error)}</p>
        {onRetry ? (
          <Button onClick={onRetry} variant="secondary">
            Try again
          </Button>
        ) : null}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="grid place-items-center py-20 text-center">
        <p className="text-muted">{emptyLabel}</p>
      </div>
    );
  }

  return null;
}
