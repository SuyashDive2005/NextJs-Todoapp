import TodoForm from "@/app/components/TodoForm";

export default function AddTodoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 fade-in">
      <div className="card">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-2 tracking-tight">Add New Todo</h1>
          <p className="text-[var(--foreground)]/70">Create a new task to stay organized</p>
        </div>
        <TodoForm />
      </div>
    </div>
  );
}