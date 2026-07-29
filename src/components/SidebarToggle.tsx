export function SidebarToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      className="sidebar-toggle"
      onClick={onToggle}
      title={open ? "Hide notes" : "Show notes"}
      aria-label={open ? "Hide notes" : "Show notes"}
      aria-expanded={open}
    >
      <svg
        viewBox="0 0 20 20"
        width="16"
        height="16"
        aria-hidden="true"
        style={{ transform: open ? "none" : "scaleX(-1)" }}
      >
        <path
          d="M12 4.5 6.5 10l5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
