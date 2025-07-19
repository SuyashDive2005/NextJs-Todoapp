'use client';

import { useState, useEffect } from 'react';
import TodoList from '@/app/components/todolist';
import { todoStore } from '@/lib/store';

export default function AllTodosPage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadedTodos = todoStore.getAllTodos();
    setTodos(loadedTodos);
  }, []);

  const handleClearAllTodos = () => {
    if (confirm('Are you sure you want to delete all todos? This action cannot be undone.')) {
      todoStore.clearAllTodos();
      setTodos([]);
    }
  };

  if (!isClient) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-2 tracking-tight">All Todos</h1>
          <p className="text-[var(--foreground)]/70">
            {todos.length > 0 
              ? `You have ${todos.length} todo${todos.length === 1 ? '' : 's'}`
              : 'No todos yet - time to add your first one!'}
          </p>
        </div>
        {todos.length > 0 && (
          <button
            onClick={handleClearAllTodos}
            className="btn bg-[var(--danger)] hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>
      <TodoList todos={todos} />
    </div>
  );
}
