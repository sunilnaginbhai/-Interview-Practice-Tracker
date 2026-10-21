import Sidebar from "./Sidebar";

const MobileDrawer = ({ open, onClose, ...props }) => (
  <>
    {open && <button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={onClose} />}
    <div className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <Sidebar {...props} mobile onNavigate={onClose} />
    </div>
  </>
);

export default MobileDrawer;
