export function SidebarToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      className="sidebar-toggle"
      onClick={onToggle}
      title={open ? "Hide notes" : "Show notes"}
      aria-label={open ? "Hide notes" : "Show notes"}
      aria-expanded={open}
    >
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        <path
          d="M3 6.5A1.5 1.5 0 0 1 4.5 5h3.4l1.4 1.6h6.2A1.5 1.5 0 0 1 17 8.1v6.4A1.5 1.5 0 0 1 15.5 16h-11A1.5 1.5 0 0 1 3 14.5V6.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
