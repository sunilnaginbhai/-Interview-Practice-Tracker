import { NavLink } from "react-router";
import Button from "../common/Button";

const links = [
  ["Dashboard", "/", "⌂"],
  ["Questions", "/questions", "☷"],
  ["Media", "/media", "▣"],
  ["Links", "/links", "↗"],
  ["Analytics", "/analytics", "◔"],
];

const Sidebar = ({ onNavigate, theme, onToggleTheme, mobile = false }) => (
  <aside className={`${mobile ? "flex" : "fixed inset-y-0 left-0 z-30 hidden lg:flex"} h-screen w-60 max-w-[85vw] shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900`}>
    <NavLink to="/" className="mb-8 px-2 text-lg font-bold text-slate-900 dark:text-slate-100">🎯 Prep Tracker</NavLink>
    <nav className="space-y-1" aria-label="Primary navigation">
      {links.map(([label, path, icon]) => (
        <NavLink key={path} to={path} end={path === "/"} onClick={onNavigate} className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium ${isActive ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>
          <span aria-hidden="true">{icon}</span>{label}
        </NavLink>
      ))}
    </nav>
    <div className="mt-auto border-t border-slate-200 pt-4 dark:border-slate-800">
      <Button variant="ghost" className="w-full text-left" onClick={onToggleTheme}>{theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}</Button>
    </div>
  </aside>
);

export default Sidebar;
