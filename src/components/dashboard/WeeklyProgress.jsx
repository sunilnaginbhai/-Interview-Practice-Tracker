import { useMemo, useState } from "react";
import { dayKey, formatDay, lastNDays } from "../../utils/dateHelpers";

const WeeklyProgress = ({ questions, weekKeys }) => {
  const [range, setRange] = useState("week");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const chartKeys = useMemo(() => (range === "week" ? weekKeys : lastNDays(30)), [range, weekKeys]);
  const values = useMemo(
    () =>
      chartKeys.map((key) =>
        questions.filter(
          (question) =>
            dayKey(question.completedAt || question.createdAt) === key &&
            question.status === "Completed"
        ).length
      ),
    [questions, chartKeys]
  );
  const completed = values.reduce((sum, value) => sum + value, 0);
  const displayIndexes = range === "week"
    ? chartKeys.map((_, index) => index)
    : chartKeys.map((_, index) => index).filter((index) => index % 5 === 0 || index === chartKeys.length - 1);
  const maxValue = Math.max(...values, 1);
  const chartMax = Math.max(4, Math.ceil(maxValue / 2) * 2);
  const chartPoints = values.map((value, index) => ({
    x: 24 + (index * 352) / Math.max(values.length - 1, 1),
    y: 152 - (value / chartMax) * 104,
  }));
  const linePath = chartPoints.reduce((path, point, index, points) => {
    if (index === 0) return `M ${point.x},${point.y}`;
    const previous = points[index - 1];
    const midpoint = (previous.x + point.x) / 2;
    return `${path} C ${midpoint},${previous.y} ${midpoint},${point.y} ${point.x},${point.y}`;
  }, "");
  const areaPath = `${linePath} L 376,168 L 24,168 Z`;
  const average = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
  const formatDate = (key) => new Date(`${key}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Weekly progress</p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white">{completed}</span>
            <span className="text-sm font-medium text-emerald-600">↑ {average} avg/day</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">Completed questions this {range}</p>
        </div>
        <div className="flex rounded-full bg-slate-100 p-1 text-xs font-medium dark:bg-slate-800" aria-label="Time range">
          {[
            ["week", "This week"],
            ["month", "This month"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setRange(value)}
              className={`rounded-full px-3 py-2 transition-all duration-200 ${
                range === value
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 h-48">
        {completed === 0 ? (
          <div className="flex h-full min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center dark:border-slate-700 dark:bg-slate-950">
            <div><p className="text-2xl">📈</p><p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">No completed questions yet</p><p className="mt-1 text-xs text-slate-500">Complete a question to reveal your trend.</p></div>
          </div>
        ) : <svg viewBox="0 0 400 190" preserveAspectRatio="none" className="block h-full min-h-40 w-full" role="img" aria-label="Completed questions over the last seven days">
          <defs>
            <linearGradient id="weekly-progress-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="weekly-progress-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
          {[0, chartMax / 2, chartMax].map((tick) => {
            const y = 152 - (tick / chartMax) * 104;
            return <line key={tick} x1="24" x2="376" y1={y} y2={y} stroke="currentColor" strokeDasharray="3 5" className="text-slate-200 dark:text-slate-700" />;
          })}
          <path d={areaPath} fill="url(#weekly-progress-fill)" />
          <path d={linePath} fill="none" stroke="url(#weekly-progress-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          {values.map((value, index) => {
            const point = chartPoints[index];
            const isHovered = hoveredIndex === index;
            return <g key={chartKeys[index]} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} tabIndex="0" onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)} aria-label={`${formatDate(chartKeys[index])}: ${value} completed`}>
              {value > 0 && <circle cx={point.x} cy={point.y} r={isHovered ? "6" : "4"} fill="#fff" stroke="#0ea5e9" strokeWidth="3" />}
              <circle cx={point.x} cy={point.y} r="10" fill="transparent" />
              {isHovered && <g pointerEvents="none" transform={`translate(${Math.max(8, Math.min(point.x - 52, 292))},${Math.max(8, point.y - 48)})`}><rect width="104" height="36" rx="8" fill="#0f172a" /><text x="52" y="15" textAnchor="middle" fill="#fff" fontSize="9">{formatDate(chartKeys[index])}</text><text x="52" y="28" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="600">{value} completed</text></g>}
            </g>;
          })}
        </svg>}
      </div>
      <div className={`grid gap-0.5 text-center text-[10px] text-slate-400 sm:gap-2 sm:text-xs`} style={{ gridTemplateColumns: `repeat(${displayIndexes.length}, minmax(0, 1fr))` }}>
        {displayIndexes.map((index) => <span key={chartKeys[index]} className="truncate">{range === "week" ? formatDay(chartKeys[index]) : `${new Date(`${chartKeys[index]}T12:00:00`).getMonth() + 1}/${new Date(`${chartKeys[index]}T12:00:00`).getDate()}`}</span>)}
      </div>
    </section>
  );
};

export default WeeklyProgress;
