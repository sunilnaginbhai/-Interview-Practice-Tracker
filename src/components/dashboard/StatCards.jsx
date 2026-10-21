import { useNavigate } from "react-router";

const StatCards = ({ stats }) => {
  const navigate = useNavigate();
  const cards = [
    ["Total Questions", stats.total, "📋", "bg-blue-100", "/questions", stats.totalTrend],
    ["Completed", stats.completed, "✓", "bg-green-100", "/questions", stats.completedTrend],
    ["In Progress", stats.inProgress, "◷", "bg-amber-100", "/questions", 0],
    ["Completion Rate", `${stats.percent}%`, "◔", "bg-purple-100", "/analytics", stats.percentTrend],
  ];
  return (
    <section className="grid grid-cols-2 gap-3" aria-label="Statistics">
      {cards.map(([label, value, icon, color, path, trend]) => (
        <button key={label} onClick={() => navigate(path)} className="flex min-h-44 min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>{icon}</span><span className={`text-xs font-medium ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>{trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%</span></div>
          <p className="mt-3 text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
        </button>
      ))}
    </section>
  );
};

export default StatCards;
