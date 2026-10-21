import MobileDrawer from "./MobileDrawer";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const PageShell = ({ children, search, onSearchChange, streak, drawerOpen, onMenu, onCloseDrawer, theme, onToggleTheme, onHelp }) => (
  <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <Sidebar theme={theme} onToggleTheme={onToggleTheme} />
    <MobileDrawer open={drawerOpen} onClose={onCloseDrawer} theme={theme} onToggleTheme={onToggleTheme} />
    <div className="min-h-screen min-w-0 lg:ml-60">
      <TopBar search={search} onSearchChange={onSearchChange} streak={streak} onMenu={onMenu} onHelp={onHelp} />
      <main id="main-content" className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">{children}</main>
    </div>
  </div>
);

export default PageShell;
