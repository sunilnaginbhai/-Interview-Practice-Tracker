import Button from "../common/Button";

const TopBar = ({ search, onSearchChange, streak, onMenu, onHelp }) => (
  <header className="sticky top-0 z-20 flex min-h-16 w-full items-center gap-2 border-b border-slate-200 bg-white/95 px-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:gap-3 sm:px-4 lg:px-6">
    <Button variant="ghost" className="lg:hidden" aria-label="Open navigation" onClick={onMenu}>☰</Button>
    <div className="relative min-w-0 flex-1">
      <label htmlFor="global-search" className="sr-only">Search questions</label>
      <input id="global-search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search questions... ( / )" className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
    </div>
    <span className="hidden shrink-0 rounded-full bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 sm:inline-block">🔥 {streak} day{streak === 1 ? "" : "s"}</span>
    <Button variant="ghost" aria-label="Keyboard shortcuts" onClick={onHelp}>?</Button>
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white" aria-label="Profile">SU</div>
  </header>
);

export default TopBar;
