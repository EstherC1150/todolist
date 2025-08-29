import { Todo, TodoCategory } from "../_types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  categories: TodoCategory[];
  searchQuery: string;
  editingId: string | null;
  editText: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
}

export default function TodoList({
  todos,
  categories,
  searchQuery,
  editingId,
  editText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
}: TodoListProps) {
  return (
    <div className="px-4 pb-24">
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center text-white/90 py-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            {searchQuery
              ? "검색 결과가 없습니다."
              : "할 일이 없습니다. 새로운 할 일을 추가해보세요!"}
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              categories={categories}
              editingId={editingId}
              editText={editText}
              onToggle={onToggle}
              onDelete={onDelete}
              onStartEdit={onStartEdit}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onEditTextChange={onEditTextChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
