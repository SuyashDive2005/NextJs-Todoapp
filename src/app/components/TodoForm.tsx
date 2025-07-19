'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { todoStore } from '@/lib/store';

type Priority = 'low' | 'medium' | 'high';
type Tag = 'work' | 'personal';

export default function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [tag, setTag] = useState<Tag>('personal');
  const [deadline, setDeadline] = useState('');
  const [reminder, setReminder] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a todo title');
      return;
    }

    setIsSubmitting(true);

    try {
      const deadlineDate = deadline ? new Date(deadline) : undefined;
      const reminderDate = reminder ? new Date(reminder) : undefined;
      
      // You'll need to update your todoStore.addTodo method to accept these new parameters
      todoStore.addTodo({
        title: title.trim(),
        description: description.trim(),
        priority,
        tag,
        deadline: deadlineDate,
        reminder: reminderDate
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setTag('personal');
      setDeadline('');
      setReminder('');
      
      router.push('/all-todos');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 fade-in">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-base font-semibold text-[var(--primary)] mb-2">
          Todo Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          placeholder="Enter your todo..."
          disabled={isSubmitting}
          autoFocus
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-base font-semibold text-[var(--primary)] mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input min-h-[100px] resize-y"
          placeholder="Add more details about your todo..."
          disabled={isSubmitting}
          rows={3}
        />
      </div>

      {/* Priority and Tag Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-base font-semibold text-[var(--primary)] mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="input"
            disabled={isSubmitting}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Tag */}
        <div>
          <label htmlFor="tag" className="block text-base font-semibold text-[var(--primary)] mb-2">
            Tag
          </label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value as Tag)}
            className="input"
            disabled={isSubmitting}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>
      </div>

      {/* Deadline and Reminder Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-base font-semibold text-[var(--primary)] mb-2">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input"
            disabled={isSubmitting}
          />
        </div>

        {/* Reminder */}
        <div>
          <label htmlFor="reminder" className="block text-base font-semibold text-[var(--primary)] mb-2">
            Reminder
          </label>
          <input
            type="datetime-local"
            id="reminder"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="input"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="btn w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}