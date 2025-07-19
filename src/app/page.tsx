import Link from 'next/link';
import { todoStore } from '@/lib/store';

export default function HomePage() {
  const todos = todoStore.getAllTodos();
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[var(--primary)] mb-4 tracking-tight drop-shadow-sm">
          Welcome to TodoApp
        </h1>
        <p className="text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto">
          Stay organized and productive with our simple, elegant todo management system.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card border-t-4 border-[var(--primary)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-[var(--primary)]">Quick Stats</h2>
            <div className="text-3xl">📊</div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[var(--foreground)]/70">Total Todos</span>
              <span className="text-2xl font-bold text-[var(--primary)]">{todos.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--foreground)]/70">Completed</span>
              <span className="text-2xl font-bold text-[var(--success)]">{completedCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--foreground)]/70">Remaining</span>
              <span className="text-2xl font-bold text-[var(--accent)]">{todos.length - completedCount}</span>
            </div>
          </div>
        </div>

        <div className="card border-t-4 border-[var(--success)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[var(--success)]">Quick Actions</h2>
            <div className="text-3xl">⚡</div>
          </div>
          <div className="space-y-3">
            <Link
              href="/add-todo"
              className="btn w-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-all duration-200 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <span className="text-lg">+</span>
              Add New Todo
            </Link>
            <Link
              href="/all-todos"
              className="btn w-full bg-transparent text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white border-2 border-[var(--primary)] transition-all duration-200 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <span className="text-lg">👁️</span>
              View All Todos
            </Link>
          </div>
        </div>
     </div>
    </div>
  )
}


