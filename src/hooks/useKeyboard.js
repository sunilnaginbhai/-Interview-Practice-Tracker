import { useEffect } from "react";

// Global keyboard shortcuts.
// handlers = { onSearch, onNew, onEscape }
const useKeyboard = ({ onSearch, onNew, onEscape } = {}) => {
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        document.activeElement?.isContentEditable;

      // "/" focuses search (unless already typing)
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        onSearch?.();
        return;
      }

      // "n" opens new question form (unless typing or modifier held)
      if (
        e.key.toLowerCase() === "n" &&
        !isTyping &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        e.preventDefault();
        onNew?.();
        return;
      }

      // Esc closes modals / drawer
      if (e.key === "Escape") {
        onEscape?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSearch, onNew, onEscape]);
};

export default useKeyboard;
