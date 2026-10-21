import EmptyState from "../common/EmptyState";
import QuestionCard from "./QuestionCard";

const QuestionList = ({ all, filtered, selected, onSelect, onDelete, onToggle, onUpdate, onAdd }) => {
  if (!all.length) return <EmptyState emoji="📚" title="No questions yet" message="Add your first practice question to start tracking progress." actionLabel="Add your first question" onAction={onAdd} />;
  if (!filtered.length) return <EmptyState emoji="🔎" title="No results found" message="Try changing your search or filters." />;
  return <div className="space-y-3">{filtered.map((question) => <QuestionCard key={question.id} question={question} selected={selected.includes(question.id)} onSelect={onSelect} onDelete={onDelete} onToggle={onToggle} onUpdate={onUpdate} />)}</div>;
};

export default QuestionList;
