'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { todoStore } from '@/lib/store';
import { Todo, getPriorityColor, getTagColor } from '@/lib/todos';

interface TodoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Unwrap the params Promise
  const { id } = use(params);

  useEffect(() => {
    // Fetch todo from localStorage on client side
    const foundTodo = todoStore.getTodoById(id);
    
    if (!foundTodo) {
      // If todo not found, redirect to 404 or todos list
      router.push('/all-todos');
      return;
    }
    
    setTodo(foundTodo);
    setIsLoading(false);
  }, [id, router]);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityEmoji = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getTagEmoji = (tag: string) => {
    switch (tag) {
      case 'work': return '💼';
      case 'personal': return '🏠';
      default: return '📝';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center py-12 fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading todo details...</p>
        </div>
      </div>
    );
  }

  // This shouldn't happen due to the redirect, but just in case
  if (!todo) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center py-12 fade-in">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Todo not found</h3>
          <p className="text-gray-500 mb-6">The todo you're looking for doesn't exist.</p>
          <Link href="/all-todos" className="btn">
            Back to All Todos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 fade-in">
      <div className="mb-6">
        <Link 
          href="/all-todos"
          className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--accent)] font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Todos
        </Link>
      </div>

      <div className="card">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-4 tracking-tight">{todo.title}</h1>
            
            {/* Tags and Priority */}
            <div className="flex items-center flex-wrap gap-3 mb-4">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTagColor(todo.tag)}`}>
                {getTagEmoji(todo.tag)} {todo.tag}
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 ${getPriorityColor(todo.priority)}`}>
                {getPriorityEmoji(todo.priority)} {todo.priority} priority
              </span>
              <span className={`badge ${todo.completed ? 'badge-success' : ''}`}>
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-[var(--foreground)]/70">
              <span>Created: {formatDate(todo.createdAt)}</span>
            </div>
          </div>
          <div className="text-4xl ml-4">
            {todo.completed ? '✅' : '📝'}
          </div>
        </div>

        {/* Description Section */}
        {todo.description && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--primary)] mb-3">Description</h2>
            <div className="bg-[var(--secondary)] rounded-lg p-4">
              <p className="text-[var(--foreground)] whitespace-pre-wrap leading-relaxed">
                {todo.description}
              </p>
            </div>
          </div>
        )}

        {/* Dates Section */}
        {(todo.deadline || todo.reminder) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--primary)] mb-3">Important Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todo.deadline && (
                <div className="bg-[var(--secondary)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📅</span>
                    <h3 className="font-medium text-[var(--foreground)]">Deadline</h3>
                  </div>
                  <p className="text-[var(--foreground)] text-sm">
                    {formatDate(todo.deadline)}
                  </p>
                </div>
              )}
              {todo.reminder && (
                <div className="bg-[var(--secondary)] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⏰</span>
                    <h3 className="font-medium text-[var(--foreground)]">Reminder</h3>
                  </div>
                  <p className="text-[var(--foreground)] text-sm">
                    {formatDateTime(todo.reminder)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Todo Details Section */}
        <div className="border-t pt-6 mb-8">
          <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">Todo Details</h2>
          <div className="bg-[var(--secondary)] rounded-lg p-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex justify-between md:flex-col md:justify-start">
                <dt className="text-sm font-medium text-[var(--foreground)]/70">ID:</dt>
                <dd className="text-sm text-[var(--foreground)] font-mono">{todo.id}</dd>
              </div>
              <div className="flex justify-between md:flex-col md:justify-start">
                <dt className="text-sm font-medium text-[var(--foreground)]/70">Status:</dt>
                <dd className="text-sm text-[var(--foreground)]">
                  {todo.completed ? 'Completed' : 'Pending'}
                </dd>
              </div>
              <div className="flex justify-between md:flex-col md:justify-start">
                <dt className="text-sm font-medium text-[var(--foreground)]/70">Priority:</dt>
                <dd className={`text-sm font-medium capitalize ${getPriorityColor(todo.priority)}`}>
                  {todo.priority}
                </dd>
              </div>
              <div className="flex justify-between md:flex-col md:justify-start">
                <dt className="text-sm font-medium text-[var(--foreground)]/70">Category:</dt>
                <dd className="text-sm text-[var(--foreground)] capitalize">
                  {todo.tag}
                </dd>
              </div>
              <div className="flex justify-between md:flex-col md:justify-start md:col-span-2">
                <dt className="text-sm font-medium text-[var(--foreground)]/70">Created:</dt>
                <dd className="text-sm text-[var(--foreground)]">
                  {formatDateTime(todo.createdAt)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/add-todo"
            className="btn flex-1"
          >
            + Add Another Todo
          </Link>
          <Link 
            href="/all-todos"
            className="btn flex-1 bg-[var(--secondary)] text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border)]"
          >
            View All Todos
          </Link>
        </div>
      </div>
    </div>
  );
}