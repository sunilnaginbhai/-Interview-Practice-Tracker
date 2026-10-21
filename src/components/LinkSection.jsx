import { useState } from "react";

const EMPTY = { label: "", url: "" };

const LinkSection = ({ items, onAdd, onDelete }) => {
    const [form, setForm] = useState(EMPTY);
    const [error, setError] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!form.label.trim() || !form.url.trim()) {
            setError("Both label and URL are required");
            return;
        }
        if (!/^https?:\/\//i.test(form.url.trim())) {
            setError("URL must start with http:// or https://");
            return;
        }
        onAdd({ label: form.label.trim(), url: form.url.trim() });
        setForm(EMPTY);
        setError("");
    };

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">🔗 Useful Links</h2>

            <form
                onSubmit={submit}
                className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_2fr_auto]"
            >
                <input
                    placeholder="Label (e.g. LeetCode)"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    className="rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                <input
                    placeholder="https://..."
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    className="rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Add
                </button>
            </form>

            {error && <p className="mb-2 text-xs text-red-600">{error}</p>}

            {items.length === 0 ? (
                <p className="text-xs text-slate-500">No links saved yet.</p>
            ) : (
                <ul className="space-y-2">
                    {items.map((l) => (
                        <li
                            key={l.id}
                            className="flex items-center justify-between rounded-lg border border-slate-200 p-2 dark:border-slate-800"
                        >
                            <a
                                href={l.url}
                                target="_blank"
                                rel="noreferrer"
                                className="truncate text-sm text-blue-600 hover:underline"
                            >
                                {l.label}
                            </a>
                            <button
                                onClick={() => onDelete(l.id)}
                                className="ml-2 min-h-11 min-w-11 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default LinkSection;