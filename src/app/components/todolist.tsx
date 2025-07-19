'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Todo } from '@/lib/todos';
import { todoStore } from '@/lib/store';

interface TodoListProps {
  todos: Todo[];
}

// Array of sticky note colors
const stickyColors = [
  'bg-yellow-200 border-yellow-300',
'bg-pink-200 border-pink-300',
'bg-green-200 border-green-300',
'bg-blue-200 border-blue-300',
'bg-purple-200 border-purple-300',
'bg-orange-200 border-orange-300',
'bg-indigo-200 border-indigo-300',
'bg-teal-200 border-teal-300',
'bg-red-200 border-red-300',
'bg-emerald-200 border-emerald-300',
'bg-lime-200 border-lime-300',
'bg-cyan-200 border-cyan-300',
'bg-rose-200 border-rose-300',
'bg-fuchsia-200 border-fuchsia-300',
'bg-sky-200 border-sky-300',
'bg-violet-200 border-violet-300',
'bg-amber-200 border-amber-300',

];

// Array of subtle rotations for sticky notes
const rotations = [
  'rotate-1',
  '-rotate-1',
  'rotate-2',
  '-rotate-2',
  'rotate-0'
];

export default function TodoList({ todos: initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load fresh data from localStorage when component mounts
    const freshTodos = todoStore.getAllTodos();
    setTodos(freshTodos);
  }, []);

  const handleToggleComplete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    todoStore.toggleTodo(id);
    const updatedTodos = todoStore.getAllTodos();
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this todo?')) {
      todoStore.deleteTodo(id);
      const updatedTodos = todoStore.getAllTodos();
      setTodos(updatedTodos);
    }
  };

  // Function to get consistent color and rotation for each todo
  const getStickyStyle = (todoId: string) => {
    const colorIndex = todoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % stickyColors.length;
    const rotationIndex = todoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % rotations.length;
    return {
      color: stickyColors[colorIndex],
      rotation: rotations[rotationIndex]
    };
  };

  if (!isClient) {
    return <div className="text-center py-12 fade-in">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
      <p className="text-gray-500">Loading todos...</p>
    </div>;
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 fade-in">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">No todos yet</h3>
        <p className="text-gray-500 mb-6">Create your first todo to get started!</p>
        <Link
          href="/add-todo"
          className="btn"
        >
          Add Your First Todo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {todos.map((todo) => {
        const stickyStyle = getStickyStyle(todo.id);
        return (
          <div
            key={todo.id}
            className={`
              ${stickyStyle.color} ${stickyStyle.rotation}
              relative p-6 rounded-lg shadow-lg 
              hover:shadow-xl hover:rotate-0 hover:scale-105
              transition-all duration-300 ease-in-out
              min-h-[200px] max-w-[280px] mx-auto
              cursor-pointer group
              font-handwriting
              border-2
            `}
            style={{
              fontFamily: "'Comic Sans MS', 'Marker Felt', 'Bradley Hand', cursive",
            }}
          >
            {/* Sticky note "tape" effect */}
            <div className="absolute -top-2 left-8 w-12 h-6 bg-yellow-100 opacity-70 rounded-sm shadow-sm transform -rotate-12"></div>
            
              <Link href={`/all-todos/${todo.id}`} className="block h-full">
              <div className="flex flex-col h-full">
                <h3 className={`
                  text-lg font-medium mb-3 leading-tight
                  ${todo.completed ? 'text-gray-600 line-through opacity-75' : 'text-gray-800'}
                `}>
                  {todo.title}
                </h3>
                
                <div className="flex-1"></div>
                
                <div className="mt-4">
                  <div className="text-xs text-gray-600 mb-3 space-y-1">
                    <p>Created: {todo.createdAt.toLocaleDateString()}</p>
                    {todo.deadline && (
                      <p className={`flex items-center gap-1 ${
                        new Date(todo.deadline) < new Date() && !todo.completed
                          ? 'text-red-600 font-semibold'
                          : 'text-gray-600'
                      }`}>
                        📅 Due: {new Date(todo.deadline).toLocaleDateString()}
                        {new Date(todo.deadline) < new Date() && !todo.completed && (
                          <span className="text-red-500">⚠️</span>
                        )}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`
                      inline-block px-2 py-1 rounded-full text-xs font-medium
                      ${todo.completed
                        ? 'bg-green-300 text-green-800'
                        : 'bg-yellow-300 text-yellow-800'
                      }
                    `}>
                      {todo.completed ? '✓ Done' : '⏳ Todo'}
                    </span>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => handleToggleComplete(e, todo.id)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          todo.completed
                            ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                            : 'bg-green-100 hover:bg-green-200 text-green-700'
                        }`}
                        title={todo.completed ? 'Mark as pending' : 'Mark as completed'}
                      >
                        {todo.completed ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      
                      <button
                        onClick={(e) => handleDeleteTodo(e, todo.id)}
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 transition-all duration-200"
                        title="Delete todo"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}