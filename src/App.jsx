import { useMemo, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import PageShell from "./components/layout/PageShell";
import StatCards from "./components/dashboard/StatCards";
import CategoryProgress from "./components/dashboard/CategoryProgress";
import DifficultyBreakdown from "./components/dashboard/DifficultyBreakdown";
import WeeklyHeatmap from "./components/dashboard/WeeklyHeatmap";
import DailyGoal from "./components/dashboard/DailyGoal";
import WeeklyProgress from "./components/dashboard/WeeklyProgress";
import AnalyticsDashboard from "./components/dashboard/AnalyticsDashboard";
import QuestionForm from "./components/questions/QuestionForm";
import QuestionList from "./components/questions/QuestionList";
import SortDropdown from "./components/questions/SortDropdown";
import MediaSection from "./components/MediaSection";
import LinkSection from "./components/LinkSection";
import Button from "./components/common/Button";
import Modal from "./components/common/Modal";
import Toast from "./components/common/Toast";
import useQuestions from "./hooks/useQuestions";
import useMedia from "./hooks/useMedia";
import useStreak from "./hooks/useStreak";
import useTheme from "./hooks/useTheme";
import useKeyboard from "./hooks/useKeyboard";
import { exportQuestions, parseImportedQuestions } from "./utils/exportImport";
import sampleQuestions from "./utils/sampleQuestions";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "./utils/constants";

const DashboardContent = () => {
  const location = useLocation();
  const {
    questions, addQuestion, updateQuestion, deleteQuestion, toggleStatus,
    bulkComplete, bulkDelete, removeSampleQuestions, mergeQuestions, sortQuestions, stats,
  } = useQuestions();
  const { media, links, addMedia, deleteMedia, addLink, deleteLink } = useMedia();
  const { streakCount, goal, setGoal, recordActivity, todayCompleted, weekKeys } = useStreak();
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", status: "", difficulty: "" });
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [samplePromptOpen, setSamplePromptOpen] = useState(() => {
    try {
      return localStorage.getItem("ipt:sample-prompt-seen") !== "true";
    } catch {
      return true;
    }
  });
  const [toast, setToast] = useState("");
  const importRef = useRef(null);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    const result = questions.filter((question) =>
      (!query || question.title.toLowerCase().includes(query)) &&
      (!filters.category || question.category === filters.category) &&
      (!filters.status || question.status === filters.status) &&
      (!filters.difficulty || question.difficulty === filters.difficulty)
    );
    return sortQuestions(result, sort);
  }, [questions, search, filters, sort, sortQuestions]);

  const add = (data) => { addQuestion(data); recordActivity(); setToast("Question added"); };
  const toggle = (id) => {
    const question = questions.find((item) => item.id === id);
    if (question?.status !== "Completed") recordActivity();
    toggleStatus(id);
  };
  const completeSelected = () => {
    if (selected.some((id) => questions.find((question) => question.id === id)?.status !== "Completed")) {
      recordActivity();
    }
    bulkComplete(selected);
    setSelected([]);
  };
  const select = (id) => setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const importFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try { const items = await parseImportedQuestions(file); mergeQuestions(items); setToast(`${items.length} questions imported`); } catch (error) { setToast(error.message); }
    event.target.value = "";
  };
  const loadSampleData = () => {
    mergeQuestions(sampleQuestions.map((question) => ({ ...question, isSample: true })));
    localStorage.setItem("ipt:sample-prompt-seen", "true");
    setSamplePromptOpen(false);
    setToast(`${sampleQuestions.length} sample questions added`);
  };
  const removeSamples = () => {
    removeSampleQuestions();
    setToast("Sample questions removed");
  };
  const dismissSamplePrompt = () => {
    localStorage.setItem("ipt:sample-prompt-seen", "true");
    setSamplePromptOpen(false);
  };
  useKeyboard({ onSearch: () => document.getElementById("global-search")?.focus(), onNew: () => setFormOpen(true), onEscape: () => { setDrawerOpen(false); setFormOpen(false); setHelpOpen(false); } });

  const isDashboard = location.pathname === "/";
  const isQuestions = location.pathname === "/questions";
  return (
    <PageShell search={search} onSearchChange={setSearch} streak={streakCount} drawerOpen={drawerOpen} onMenu={() => setDrawerOpen(true)} onCloseDrawer={() => setDrawerOpen(false)} theme={theme} onToggleTheme={toggleTheme} onHelp={() => setHelpOpen(true)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-medium text-blue-600">Good to see you, Sunil</p><h1 className="mt-1 text-2xl font-bold tracking-tight">Interview preparation dashboard</h1><p className="mt-1 text-sm text-slate-500">Build momentum one question at a time.</p></div>
        <div className="flex flex-wrap gap-2"><Button onClick={() => setFormOpen(true)}>+ Add question</Button>{questions.some((question) => question.isSample) && <Button variant="danger" onClick={removeSamples}>Remove sample data</Button>}<Button variant="secondary" onClick={() => exportQuestions(questions)}>Export</Button><Button variant="secondary" onClick={() => importRef.current?.click()}>Import</Button><input ref={importRef} type="file" accept="application/json" className="hidden" onChange={importFile} /></div>
      </div>
      {formOpen && <QuestionForm onAdd={add} onCancel={() => setFormOpen(false)} />}
      {isDashboard && <div className="space-y-4">
        <StatCards stats={stats} />
        <WeeklyProgress questions={questions} weekKeys={weekKeys} />
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <CategoryProgress questions={questions} />
          <DailyGoal goal={goal} setGoal={setGoal} completed={todayCompleted(questions)} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <DifficultyBreakdown questions={questions} />
          <WeeklyHeatmap questions={questions} weekKeys={weekKeys} />
        </div>
      </div>}
      {isQuestions && <section id="questions" className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">Practice questions</h2><p className="text-sm text-slate-500">{filtered.length} of {questions.length} questions</p></div><SortDropdown value={sort} onChange={setSort} /></div>
        <div className="flex flex-wrap items-center gap-2"><select aria-label="Filter category" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })} className="min-h-11 flex-1 rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-none"><option value="">All topics</option>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Filter status" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })} className="min-h-11 flex-1 rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-none"><option value="">All statuses</option>{STATUSES.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Filter difficulty" value={filters.difficulty} onChange={(event) => setFilters({ ...filters, difficulty: event.target.value })} className="min-h-11 flex-1 rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-none"><option value="">All difficulties</option>{DIFFICULTIES.map((item) => <option key={item}>{item}</option>)}</select>{selected.length > 0 && <><Button onClick={completeSelected}>✓ Mark completed ({selected.length})</Button><Button variant="danger" onClick={() => { bulkDelete(selected); setSelected([]); }}>⌫ Delete selected</Button></>}</div>
        <QuestionList all={questions} filtered={filtered} selected={selected} onSelect={select} onDelete={deleteQuestion} onToggle={toggle} onUpdate={updateQuestion} onAdd={() => setFormOpen(true)} />
      </section>}
      {location.pathname === "/media" && <MediaSection items={media} onAdd={addMedia} onDelete={deleteMedia} />}
      {location.pathname === "/links" && <LinkSection items={links} onAdd={addLink} onDelete={deleteLink} />}
      {location.pathname === "/analytics" && <AnalyticsDashboard questions={questions} />}
      <Modal open={samplePromptOpen} title="Welcome to Interview Prep Tracker" onClose={dismissSamplePrompt}>
        <div className="space-y-4">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Want to see how the dashboard works? Load a few sample interview questions, or start with a clean dashboard.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={dismissSamplePrompt}>Start empty</Button>
            <Button onClick={loadSampleData}>Use sample data</Button>
          </div>
        </div>
      </Modal>
      <Modal open={helpOpen} title="Keyboard shortcuts" onClose={() => setHelpOpen(false)}><ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300"><li><kbd>/</kbd> Focus search</li><li><kbd>N</kbd> Add a question</li><li><kbd>Esc</kbd> Close dialogs and drawer</li></ul></Modal>
      <Toast message={toast} onClose={() => setToast("")} />
    </PageShell>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<DashboardContent />} />
    <Route path="/questions" element={<DashboardContent />} />
    <Route path="/media" element={<DashboardContent />} />
    <Route path="/links" element={<DashboardContent />} />
    <Route path="/analytics" element={<DashboardContent />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
