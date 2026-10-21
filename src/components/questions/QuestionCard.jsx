import { useState } from "react";
import Button from "../common/Button";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../../utils/constants";

const QuestionCard = ({ question, selected, onSelect, onDelete, onToggle, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(question);
  const save = () => { onUpdate(question.id, draft); setEditing(false); };
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
        <input aria-label={`Select ${question.title}`} type="checkbox" checked={selected} onChange={() => onSelect(question.id)} className="mt-1 h-5 w-5 accent-blue-600" />
        <button className="min-w-0 flex-1 text-left" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
          <p className="font-medium text-slate-900 dark:text-slate-100">{question.title}</p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-xs"><span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">{question.category}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">{question.difficulty}</span><span className={`rounded-full px-2.5 py-1 font-medium ${question.status === "Completed" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : question.status === "In Progress" ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{question.status}</span></div>
        </button>
        <div className="flex flex-wrap gap-1 sm:justify-end">
          <Button variant="ghost" aria-label="Edit question" title="Edit question" onClick={() => { setDraft(question); setEditing(true); }}>✎</Button>
          <Button variant="ghost" aria-label="Cycle question status" title="Cycle status" onClick={() => onToggle(question.id)}>↻</Button>
          <Button variant="danger" aria-label="Delete question" title="Delete question" onClick={() => onDelete(question.id)}>⌫</Button>
        </div>
      </div>
      {expanded && !editing && <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800"><p className="mb-1 text-xs font-semibold text-slate-500">Notes</p><p className="whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300">{question.notes || "No notes yet. Edit this question to add notes."}</p></div>}
      {editing && <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 dark:border-slate-800">
        <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" aria-label="Question title" />
        <input value={draft.notes || ""} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} placeholder="Notes" className="rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" aria-label="Question notes" />
        {[["category", CATEGORIES], ["difficulty", DIFFICULTIES], ["status", STATUSES]].map(([key, options]) => <select key={key} value={draft[key]} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} className="rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700 dark:bg-slate-800">{options.map((option) => <option key={option}>{option}</option>)}</select>)}
        <div className="flex gap-2 sm:col-span-2"><Button onClick={save}>Save</Button><Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button></div>
      </div>}
    </article>
  );
};

export default QuestionCard;
