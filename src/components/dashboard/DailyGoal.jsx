import Button from "../common/Button";

const DailyGoal = ({ goal, setGoal, completed }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center justify-between"><h2 className="font-semibold">Daily goal</h2><label className="text-sm text-slate-500">Target <input aria-label="Daily goal target" type="number" min="1" max="99" value={goal} onChange={(event) => setGoal(Math.max(1, Number(event.target.value)))} className="ml-1 w-14 rounded border border-slate-200 p-1 text-center dark:border-slate-700 dark:bg-slate-800" /></label></div>
    <div className="mt-4 flex items-end justify-between"><span className="text-3xl font-bold text-blue-600">{Math.min(completed, goal)}<span className="text-base text-slate-400">/{goal}</span></span><span className="text-sm text-slate-500">completed today</span></div>
    <div className="mt-3 h-3 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-3 rounded-full bg-green-500" style={{ width: `${Math.min(100, (completed / goal) * 100)}%` }} /></div>
    {completed >= goal && <p className="mt-3 text-sm font-medium text-green-600">🎉 Goal complete!</p>}
    {completed === 0 && <Button variant="ghost" className="mt-2 px-0 text-blue-600">Start your first question today →</Button>}
  </section>
);

export default DailyGoal;
