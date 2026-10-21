import Button from "./Button";

const EmptyState = ({ emoji = "✨", title, message, actionLabel, onAction }) => (
  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-950">
    <div className="text-3xl">{emoji}</div>
    <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
    <p className="mt-1 text-sm text-slate-500">{message}</p>
    {actionLabel && <Button className="mt-4" onClick={onAction}>{actionLabel}</Button>}
  </div>
);

export default EmptyState;
