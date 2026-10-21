const DifficultyBreakdown = ({ questions }) => {
  const colors = { Easy: "#10b981", Medium: "#f59e0b", Hard: "#f43f5e" };
  const totals = ["Easy", "Medium", "Hard"].map((difficulty) => questions.filter((question) => question.difficulty === difficulty).length);
  const completed = ["Easy", "Medium", "Hard"].map((difficulty) => questions.filter((question) => question.difficulty === difficulty && question.status === "Completed").length);
  const total = totals.reduce((sum, value) => sum + value, 0);
  const easyEnd = total ? (totals[0] / total) * 100 : 0;
  const mediumEnd = total ? easyEnd + (totals[1] / total) * 100 : 0;
  const donut = `conic-gradient(${colors.Easy} 0 ${easyEnd}%, ${colors.Medium} ${easyEnd}% ${mediumEnd}%, ${colors.Hard} ${mediumEnd}% 100%)`;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h2 className="font-semibold">Difficulty mix</h2><p className="mt-1 text-sm text-slate-500">Question distribution and completions</p>
      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-32 w-32 shrink-0 rounded-full" style={{ background: donut }}><div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900"><strong className="text-2xl">{total}</strong><span className="text-xs text-slate-500">total</span></div></div>
        <div className="w-full space-y-3">
          {["Easy", "Medium", "Hard"].map((difficulty, index) => <div key={difficulty} className="flex items-center justify-between text-sm"><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[difficulty] }} />{difficulty}</span><span className="text-slate-500">{completed[index]} / {totals[index]} done</span></div>)}
        </div>
      </div>
    </section>
  );
};

export default DifficultyBreakdown;
