import { HttpError } from "@react-workshop/http-client";

/** Turns a thrown request error into copy that is safe to show to a shopper. */
export function resolveErrorMessage(error: Error | null | undefined): string {
  if (error instanceof HttpError && error.status) {
    return `Request failed with status ${error.status}. Please try again.`;
  }

  return "Something went wrong while loading this content.";
}
