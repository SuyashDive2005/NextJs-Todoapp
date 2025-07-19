import { Todo } from '@/lib/todos';

const STORAGE_KEY = 'nextjs-todos';

// Default todos for first-time users
const defaultTodos: Todo[] = [
];

// Helper functions for localStorage
const loadTodosFromStorage = (): Todo[] => {
  if (typeof window === 'undefined') return defaultTodos;
  
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      // Convert date strings back to Date objects
      return parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        ...(todo.deadline ? { deadline: new Date(todo.deadline) } : {}),
        ...(todo.reminder ? { reminder: new Date(todo.reminder) } : {}),
      }));
    }
    return defaultTodos;
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return defaultTodos;
  }
};

const saveTodosToStorage = (todos: Todo[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};

// Type for the addTodo parameter
interface AddTodoParams {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tag: 'work' | 'personal';
  deadline?: Date;
  reminder?: Date;
}

export const todoStore = {
  // Get all todos
  getAllTodos: (): Todo[] => {
    return loadTodosFromStorage();
  },

  // Get todo by ID
  getTodoById: (id: string): Todo | undefined => {
    const todos = loadTodosFromStorage();
    return todos.find(todo => todo.id === id);
  },

  // Add new todo - Updated to accept object parameter
  addTodo: (params: AddTodoParams): Todo => {
    const todos = loadTodosFromStorage();
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: params.title.trim(),
      description: params.description.trim(),
      priority: params.priority,
      tag: params.tag,
      createdAt: new Date(),
      completed: false,
      ...(params.deadline ? { deadline: params.deadline } : {}),
      ...(params.reminder ? { reminder: params.reminder } : {}),
    };
    const updatedTodos = [...todos, newTodo];
    saveTodosToStorage(updatedTodos);
    return newTodo;
  },

  // Legacy addTodo method for backward compatibility (optional)
  addTodoLegacy: (title: string, deadline?: Date): Todo => {
    return todoStore.addTodo({
      title,
      description: '',
      priority: 'medium',
      tag: 'personal',
      deadline,
    });
  },

  // Toggle todo completion
  toggleTodo: (id: string): void => {
    const todos = loadTodosFromStorage();
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodosToStorage(updatedTodos);
  },

  // Delete todo
  deleteTodo: (id: string): void => {
    const todos = loadTodosFromStorage();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodosToStorage(updatedTodos);
  },

  // Clear all todos
  clearAllTodos: (): void => {
    saveTodosToStorage([]);
  },

  // Initialize storage with default todos (only if empty)
  initializeStorage: (): void => {
    if (typeof window === 'undefined') return;
    
    const existingTodos = localStorage.getItem(STORAGE_KEY);
    if (!existingTodos) {
      saveTodosToStorage(defaultTodos);
    }
  },
};