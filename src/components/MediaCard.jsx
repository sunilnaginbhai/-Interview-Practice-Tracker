import { useState } from "react";
import Modal from "./common/Modal";

const MediaCard = ({ item, onDelete }) => {
    const { id, type, title, url } = item;
    const [previewOpen, setPreviewOpen] = useState(false);

    return (
        <article className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <button
                type="button"
                aria-label={`Open ${title}`}
                onClick={() => url && setPreviewOpen(true)}
                className="block aspect-video w-full cursor-zoom-in bg-slate-100 text-left dark:bg-slate-800"
            >
                {!url ? (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        Preview unavailable
                    </div>
                ) : type === "image" ? (
                    <img
                        src={url}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                            event.currentTarget.parentElement.textContent = "Preview unavailable";
                        }}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <video
                        src={url}
                        controls
                        preload="metadata"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                            event.currentTarget.parentElement.textContent = "Preview unavailable";
                        }}
                        className="h-full w-full object-cover"
                    />
            )}
            </button>

            <div className="flex items-center justify-between p-2">
                <p className="truncate text-xs text-slate-700 dark:text-slate-300">{title}</p>
                <button
                    onClick={() => onDelete(id)}
                    className="min-h-11 min-w-11 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                    ✕
                </button>
            </div>
            <Modal
                open={previewOpen}
                title={title}
                onClose={() => setPreviewOpen(false)}
                className="max-w-5xl"
            >
                {url && type === "image" ? (
                    <img
                        src={url}
                        alt={title}
                        className="max-h-[75vh] w-full rounded-lg object-contain"
                    />
                ) : url ? (
                    <video
                        src={url}
                        controls
                        autoPlay
                        className="max-h-[75vh] w-full rounded-lg"
                    />
                ) : (
                    <p className="text-sm text-slate-500">Preview unavailable.</p>
                )}
            </Modal>
        </article>
    );
};

export default MediaCard;