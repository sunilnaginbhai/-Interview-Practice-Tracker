import { useState } from "react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../utils/constants";

const EMPTY = { title: "", category: "", difficulty: "", status: "Pending" };

const QuestionForm = ({ onAdd }) => {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});

    const update = (key) => (e) =>
        setForm({ ...form, [key]: e.target.value });

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Title is required";
        else if (form.title.trim().length < 3) e.title = "At least 3 characters";
        if (!form.category) e.category = "Choose a category";
        if (!form.difficulty) e.difficulty = "Choose a difficulty";
        return e;
    };

    const submit = (e) => {
        e.preventDefault();
        const v = validate();
        if (Object.keys(v).length) {
            setErrors(v);
            return;
        }
        onAdd({ ...form, title: form.title.trim() });
        setForm(EMPTY);
        setErrors({});
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
            <h2 className="mb-3 text-sm font-semibold text-gray-700">➕ Add Question</h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <input
                        placeholder="Question title (e.g. Two Sum)"
                        value={form.title}
                        onChange={update("title")}
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                    />
                    {errors.title && (
                        <p className="mt-1 text-xs text-red-600">{errors.title}</p>
                    )}
                </div>

                <div>
                    <select
                        value={form.category}
                        onChange={update("category")}
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                    >
                        <option value="">Select category</option>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="mt-1 text-xs text-red-600">{errors.category}</p>
                    )}
                </div>

                <div>
                    <select
                        value={form.difficulty}
                        onChange={update("difficulty")}
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                    >
                        <option value="">Select difficulty</option>
                        {DIFFICULTIES.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                    {errors.difficulty && (
                        <p className="mt-1 text-xs text-red-600">{errors.difficulty}</p>
                    )}
                </div>

                <div className="sm:col-span-2">
                    <select
                        value={form.status}
                        onChange={update("status")}
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
            >
                Add Question
            </button>
        </form>
    );
};

export default QuestionForm;