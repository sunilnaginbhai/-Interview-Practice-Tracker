import { formatDay } from "../../utils/dateHelpers";

const WeeklyHeatmap = ({ questions, weekKeys }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
    <div className="flex items-center justify-between"><div><h2 className="font-semibold">Activity heatmap</h2><p className="mt-1 text-sm text-slate-500">Questions added over the last 7 days</p></div><span className="text-xs text-slate-400">Less <i className="mx-1 inline-block h-2.5 w-2.5 rounded bg-slate-100 dark:bg-slate-800" /><i className="mx-1 inline-block h-2.5 w-2.5 rounded bg-blue-400" /> More</span></div>
    <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-3">
      {weekKeys.map((key) => {
        const count = questions.filter((question) => question.createdAt && new Date(question.createdAt).toISOString().slice(0, 10) === key).length;
        return <div key={key} className="text-center"><div title={`${count} questions`} className={`mx-auto aspect-square w-full max-w-12 rounded-lg ${count > 3 ? "bg-blue-700" : count > 1 ? "bg-blue-400" : count ? "bg-blue-200" : "bg-slate-100 dark:bg-slate-800"}`} /><span className="mt-2 block text-xs text-slate-500">{formatDay(key)}</span></div>;
      })}
    </div>
  </section>
);

export default WeeklyHeatmap;
