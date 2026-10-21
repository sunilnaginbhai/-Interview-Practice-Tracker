import { useState } from "react";
import Button from "../common/Button";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../../utils/constants";

const EMPTY = { title: "", category: "", difficulty: "", status: "Pending", notes: "" };

const QuestionForm = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    if (form.title.trim().length < 3 || !form.category || !form.difficulty) {
      setError("Add a title (at least 3 characters), category, and difficulty.");
      return;
    }
    onAdd({ ...form, title: form.title.trim() });
    setForm(EMPTY);
    setError("");
    onCancel?.();
  };
  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Add question</h2>{onCancel && <Button variant="ghost" onClick={onCancel}>Close</Button>}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input autoFocus placeholder="Question title (e.g. Two Sum)" value={form.title} onChange={update("title")} className="rounded-lg border border-slate-200 p-3 text-sm sm:col-span-2 dark:border-slate-700 dark:bg-slate-800" />
        <select value={form.category} onChange={update("category")} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option value="">Category</option>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select>
        <select value={form.difficulty} onChange={update("difficulty")} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option value="">Difficulty</option>{DIFFICULTIES.map((item) => <option key={item}>{item}</option>)}</select>
        <select value={form.status} onChange={update("status")} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700 dark:bg-slate-800 sm:col-span-2">{STATUSES.map((item) => <option key={item}>{item}</option>)}</select>
        <textarea placeholder="Optional notes" value={form.notes} onChange={update("notes")} className="min-h-20 rounded-lg border border-slate-200 p-3 text-sm sm:col-span-2 dark:border-slate-700 dark:bg-slate-800" />
      </div>
      {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" className="mt-4">Add question</Button>
    </form>
  );
};

export default QuestionForm;
