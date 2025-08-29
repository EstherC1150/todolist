interface ActionBarProps {
  hasCompletedTodos: boolean;
  onAddTodo: () => void;
  onClearCompleted: () => void;
}

export default function ActionBar({
  hasCompletedTodos,
  onAddTodo,
  onClearCompleted,
}: ActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-20">
      <div className="flex items-center justify-between gap-4">
        {/* 작업 추가 버튼 - 반투명하고 화면 너비에 맞게 */}
        <button
          onClick={onAddTodo}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
        >
          <span className="text-2xl">+</span>
          <span className="text-lg font-medium">작업 추가</span>
        </button>

        {/* 완료된 할 일 정리 버튼 */}
        {hasCompletedTodos && (
          <button
            onClick={onClearCompleted}
            className="px-6 py-4 bg-red-500/80 text-white rounded-xl hover:bg-red-500 transition-colors backdrop-blur-sm border border-red-400/50"
          >
            완료된 할 일 정리
          </button>
        )}
      </div>
    </div>
  );
}
