import MediaCard from "./MediaCard";

const MediaSection = ({ items, onAdd, onDelete }) => {
    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const type = file.type.startsWith("video") ? "video" : "image";
        onAdd(file, file.name, type);
        e.target.value = "";
    };

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">📸 My Media</h2>
                <label                 className="min-h-11 cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                    + Add Media
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFile}
                        hidden
                    />
                </label>
            </div>

            {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-950">
                    No photos or videos yet. Add your first one.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((m) => (
                        <MediaCard key={m.id} item={m} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default MediaSection;