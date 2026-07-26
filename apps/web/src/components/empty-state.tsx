import { Link } from "react-router";

export type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel: string;
  actionTo: string;
};

export function EmptyState({ actionLabel, actionTo, description, title }: EmptyStateProps) {
  return (
    <div className="grid place-items-center gap-4 py-20 text-center">
      <h2 className="text-2xl font-semibold text-dark">{title}</h2>
      <p className="max-w-[420px] text-muted">{description}</p>
      <Link
        className="mt-2 inline-flex rounded-[15px] border border-black px-12 py-3 text-xl transition-colors hover:bg-black hover:text-white"
        to={actionTo}
      >
        {actionLabel}
      </Link>
    </div>
  );
}
