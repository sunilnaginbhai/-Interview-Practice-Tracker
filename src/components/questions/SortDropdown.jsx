const SortDropdown = ({ value, onChange }) => (
  <label className="flex items-center gap-2 text-sm text-slate-500">
    Sort
    <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="alphabetical">A-Z</option>
      <option value="difficulty">Difficulty</option>
    </select>
  </label>
);

export default SortDropdown;
