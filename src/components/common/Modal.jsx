import { useEffect } from "react";

const Modal = ({ open, title, onClose, children, className = "" }) => {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={onClose}>
      <div className={`w-full max-w-md rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900 ${className}`} onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
          <button aria-label="Close dialog" className="min-h-11 min-w-11 rounded-lg text-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
