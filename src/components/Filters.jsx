import { CATEGORIES, STATUSES, DIFFICULTIES } from "../utils/constants";

const Filters = ({ filters, setFilters }) => {
    const update = (key) => (e) =>
        setFilters({ ...filters, [key]: e.target.value });

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <select
                value={filters.category}
                onChange={update("category")}
                className="rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select
                value={filters.status}
                onChange={update("status")}
                className="rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
                <option value="">All Statuses</option>
                {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <select
                value={filters.difficulty}
                onChange={update("difficulty")}
                className="rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
                <option value="">All Difficulties</option>
                {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                ))}
            </select>
        </div>
    );
};

export default Filters;