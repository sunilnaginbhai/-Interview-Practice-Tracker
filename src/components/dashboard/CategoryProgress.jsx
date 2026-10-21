const CategoryProgress = ({ questions }) => {
  const categories = ["DSA", "Git", "Technical", "Machine Coding"];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex items-center justify-between"><div><h2 className="font-semibold">Topic breakdown</h2><p className="mt-1 text-sm text-slate-500">Completed vs remaining by category</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">Live</span></div>
      <div className="mt-5 space-y-5">
        {categories.map((category) => {
          const total = questions.filter((question) => question.category === category).length;
          const completed = questions.filter((question) => question.category === category && question.status === "Completed").length;
          const percent = total ? Math.round((completed / total) * 100) : 0;
          return <div key={category}><div className="mb-2 flex justify-between text-sm"><span className="font-medium">{category}</span><span className="text-slate-500">{completed}/{total} <span className="ml-1 text-xs">({percent}%)</span></span></div><div className="flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="bg-gradient-to-r from-sky-500 to-teal-400 transition-all duration-300" style={{ width: `${percent}%` }} /><div className="flex-1 bg-slate-200 dark:bg-slate-700" /></div></div>;
        })}
      </div>
      <div className="mt-5 flex gap-4 text-xs text-slate-500"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-teal-400" />Completed</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700" />Remaining</span></div>
    </section>
  );
};

export default CategoryProgress;
