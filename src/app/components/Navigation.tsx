import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white dark:bg-[#18181b] shadow-lg border-b border-[var(--border)] sticky top-0 z-30 fade-in">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-[var(--primary)] hover:text-[var(--accent)] transition-colors">
            <span className="inline-flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M9 9h6v6H9z" /></svg>
              TodoApp
            </span>
          </Link>
          <div className="flex gap-3 md:gap-6">
            <Link
              href="/add-todo"
              className="btn bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-sm"
            >
              + Add Todo
            </Link>
            <Link
              href="/all-todos"
              className="btn bg-[var(--secondary)] text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border)]"
            >
              All Todos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
