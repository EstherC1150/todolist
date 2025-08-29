import { Todo, TodoCategory } from "../_types/todo";

interface TodoItemProps {
  todo: Todo;
  categories: TodoCategory[];
  editingId: string | null;
  editText: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
}

export default function TodoItem({
  todo,
  categories,
  editingId,
  editText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
}: TodoItemProps) {
  // 카테고리별 색상 가져오기
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.color || "#6B7280";
  };

  // 우선순위별 색상
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const isEditing = editingId === todo.id;

  return (
    <div
      className={`bg-white/15 backdrop-blur-sm rounded-xl border border-white/25 p-4 transition-all hover:bg-white/25 ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* 체크박스 */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-1 bg-white/20 border-white/30"
        />

        {/* 할 일 내용 */}
        <div className="flex-1 min-w-0">
          {/* 편집 모드 */}
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => onEditTextChange(e.target.value)}
                className="flex-1 px-3 py-1 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSaveEdit(todo.id);
                  if (e.key === "Escape") onCancelEdit();
                }}
              />
              <button
                onClick={() => onSaveEdit(todo.id)}
                className="px-3 py-1 bg-green-600/80 text-white rounded hover:bg-green-600 text-sm backdrop-blur-sm"
              >
                저장
              </button>
              <button
                onClick={onCancelEdit}
                className="px-3 py-1 bg-gray-600/80 text-white rounded hover:bg-gray-600 text-sm backdrop-blur-sm"
              >
                취소
              </button>
            </div>
          ) : (
            <div>
              <span
                className={`text-lg font-medium ${
                  todo.completed ? "line-through text-white/60" : "text-white"
                }`}
              >
                {todo.text}
              </span>

              {/* 메모 */}
              {todo.notes && (
                <p className="text-white/80 text-sm mt-2 italic">
                  📝 {todo.notes}
                </p>
              )}

              {/* 카테고리 라벨 */}
              <div className="mt-2">
                <span className="text-xs text-white/70">작업</span>
              </div>
            </div>
          )}

          {/* 메타 정보 */}
          <div className="flex flex-wrap gap-2 mt-3">
            {/* 우선순위 */}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                priorityColors[todo.priority]
              }`}
            >
              {todo.priority === "low" && "낮음"}
              {todo.priority === "medium" && "보통"}
              {todo.priority === "high" && "높음"}
            </span>

            {/* 카테고리 */}
            {todo.category && (
              <span
                className="px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{
                  backgroundColor: getCategoryColor(todo.category),
                }}
              >
                {categories.find((cat) => cat.id === todo.category)?.name}
              </span>
            )}

            {/* 마감일 */}
            {todo.dueDate && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                📅 {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex gap-2">
          {!isEditing && (
            <button
              onClick={() => onStartEdit(todo)}
              className="p-2 text-blue-300 hover:text-blue-200 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
              title="편집"
            >
              ✏️
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-red-300 hover:text-red-200 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
            title="삭제"
          >
            🗑️
          </button>
          {/* 별표 아이콘 (중요 표시) */}
          <button className="p-2 text-yellow-300 hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm">
            ⭐
          </button>
        </div>
      </div>
    </div>
  );
}
