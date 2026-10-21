const Toast = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-sm">
      {message}
      <button aria-label="Dismiss notification" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
