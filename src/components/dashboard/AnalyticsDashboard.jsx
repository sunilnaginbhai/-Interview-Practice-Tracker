import { useMemo } from "react";
import { dayKey, formatDay, lastNDays } from "../../utils/dateHelpers";

const Card = ({ title, description, children, className = "" }) => (
  <section className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 ${className}`}>
    <div className="mb-5">
      <h2 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
    {children}
  </section>
);

const LineChart = ({ values, labels, color = "#0ea5e9", fill = false }) => {
  const max = Math.max(...values, 1);
  const hasData = values.some((value) => value > 0);
  const points = values.map((value, index) => {
    const x = 16 + (index * 368) / Math.max(values.length - 1, 1);
    const y = 150 - (value / max) * 112;
    return `${x},${y}`;
  }).join(" ");
  return (
    <div className="min-w-0 overflow-hidden">
      {!hasData ? <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center dark:border-slate-700 dark:bg-slate-950"><div><p className="text-xl">📊</p><p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">Not enough activity yet</p><p className="mt-1 text-xs text-slate-500">Complete questions to build this chart.</p></div></div> : <svg viewBox="0 0 400 175" preserveAspectRatio="none" className="block h-auto min-h-40 w-full" role="img" aria-label="Analytics trend chart">
        <line x1="16" x2="384" y1="150" y2="150" stroke="currentColor" className="text-slate-200 dark:text-slate-700" />
        {fill && <polygon points={`16,150 ${points} 384,150`} fill="url(#analytics-fill)" />}
        <polyline points={points} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        {values.map((value, index) => {
          const [x, y] = points.split(" ")[index].split(",");
          return <circle key={`${labels[index]}-${value}`} cx={x} cy={y} r="4" fill="white" stroke={color} strokeWidth="3" />;
        })}
        <defs><linearGradient id="analytics-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" /><stop offset="100%" stopColor="#14b8a6" stopOpacity="0" /></linearGradient></defs>
      </svg>}
      <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-slate-400 sm:gap-1 sm:text-xs">{labels.map((label) => <span key={label} className="truncate">{label}</span>)}</div>
    </div>
  );
};

const AnalyticsDashboard = ({ questions }) => {
  const keys = useMemo(() => lastNDays(7), []);
  const completedByDay = useMemo(() => keys.map((key) => questions.filter((question) => question.status === "Completed" && dayKey(question.completedAt || question.createdAt) === key).length), [keys, questions]);
  const cumulative = useMemo(() => completedByDay.reduce((totals, value) => [
    ...totals,
    (totals[totals.length - 1] || 0) + value,
  ], []), [completedByDay]);
  const statusData = ["Completed", "In Progress", "Pending"].map((status) => questions.filter((question) => question.status === status).length);
  const statusTotal = Math.max(questions.length, 1);
  const statusEnd = statusData.reduce((result, value) => [...result, result[result.length - 1] + (value / statusTotal) * 100], [0]);
  const topicData = ["DSA", "Git", "Technical", "Machine Coding"].map((category) => {
    const total = questions.filter((question) => question.category === category).length;
    const done = questions.filter((question) => question.category === category && question.status === "Completed").length;
    return { category, total, done, percent: total ? Math.round((done / total) * 100) : 0 };
  });
  const difficultyData = ["Easy", "Medium", "Hard"].map((difficulty) => questions.filter((question) => question.difficulty === difficulty).length);
  const weekdayData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((_, day) => questions.filter((question) => new Date(question.completedAt || question.createdAt).getDay() === day).length);
  const maxWeekday = Math.max(...weekdayData, 1);
  const statusColors = ["#10b981", "#f59e0b", "#94a3b8"];
  const difficultyColors = ["bg-emerald-500", "bg-amber-500", "bg-rose-500"];

  return (
    <div className="space-y-5">
      <div><p className="text-sm font-medium text-blue-600">Performance overview</p><h2 className="mt-1 text-2xl font-bold">Analytics</h2><p className="mt-1 text-sm text-slate-500">Real-time insights from your saved practice questions.</p></div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Completion trend" description="Completed questions across the last seven days"><LineChart values={completedByDay} labels={keys.map(formatDay)} fill /></Card>
        <Card title="Cumulative velocity" description="Your total completed questions building over time"><LineChart values={cumulative} labels={keys.map(formatDay)} color="#14b8a6" /></Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Card title="Status mix" description="Current workload by status">
          <div className="flex min-w-0 flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="relative h-32 w-32 shrink-0 rounded-full sm:h-36 sm:w-36" style={{ background: `conic-gradient(${statusColors[0]} 0 ${statusEnd[0]}%, ${statusColors[1]} ${statusEnd[0]}% ${statusEnd[1]}%, ${statusColors[2]} ${statusEnd[1]}% 100%)` }}><div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900"><strong className="text-2xl">{questions.length}</strong><span className="text-xs text-slate-500">questions</span></div></div>
            <div className="w-full max-w-xs space-y-3 text-sm">{["Completed", "In Progress", "Pending"].map((status, index) => <div key={status} className="flex items-center gap-2"><i className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: statusColors[index] }} /><span className="truncate">{status}</span><strong className="ml-auto">{statusData[index]}</strong></div>)}</div>
          </div>
        </Card>
        <Card title="Topic performance" description="Completion rate by interview topic">
          <div className="space-y-4">{topicData.map(({ category, total, done, percent }) => <div key={category}><div className="mb-1.5 flex justify-between text-sm"><span className="font-medium">{category}</span><span className="text-slate-500">{done}/{total} · {percent}%</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all" style={{ width: `${percent}%` }} /></div></div>)}</div>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Difficulty distribution" description="How your question set is balanced">
          <div className="space-y-5">{["Easy", "Medium", "Hard"].map((difficulty, index) => <div key={difficulty}><div className="mb-1.5 flex justify-between text-sm"><span>{difficulty}</span><span className="font-semibold">{difficultyData[index]}</span></div><div className="h-4 rounded-full bg-slate-100 dark:bg-slate-800"><div className={`h-4 rounded-full ${difficultyColors[index]}`} style={{ width: `${questions.length ? (difficultyData[index] / questions.length) * 100 : 0}%` }} /></div></div>)}</div>
        </Card>
        <Card title="Study rhythm" description="Completions grouped by day of the week">
          <div className="flex h-44 min-w-0 items-end justify-between gap-1 sm:gap-2">{weekdayData.map((value, index) => <div key={index} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"><span className="text-xs font-medium text-slate-500">{value || ""}</span><div className="w-full max-w-8 rounded-t-md bg-blue-500 transition-all duration-300" style={{ height: `${Math.max(value ? (value / maxWeekday) * 100 : 4, 4)}%` }} /><span className="text-xs text-slate-400">{["S", "M", "T", "W", "T", "F", "S"][index]}</span></div>)}</div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
