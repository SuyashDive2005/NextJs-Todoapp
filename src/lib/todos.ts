// Todo type definition with all the new fields
export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tag: 'work' | 'personal';
  completed: boolean;
  createdAt: Date;
  deadline?: Date;
  reminder?: Date;
}

// Additional helper types
export type Priority = 'low' | 'medium' | 'high';
export type Tag = 'work' | 'personal';

// Filter types for todo lists
export interface TodoFilters {
  tag?: Tag;
  priority?: Priority;
  completed?: boolean;
}

// Utility function to get priority color
export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high': return 'text-red-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
};

// Utility function to get tag color
export const getTagColor = (tag: Tag): string => {
  switch (tag) {
    case 'work': return 'bg-blue-100 text-blue-800';
    case 'personal': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};