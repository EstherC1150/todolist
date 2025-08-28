"use client";

import { useState } from "react";
import Sidebar from "./_components/Sidebar";
import OptionsMenu from "./_components/OptionsMenu";
import AddTodoModal from "./_components/AddTodoModal";
import { useTodoStore } from "./_store/todoStore";
import { useSettingsStore } from "./_store/settingsStore";
import { Todo, TodoCategory } from "./_types/todo";

export default function Home() {
  const {
    todos,
    categories,
    filter,
    searchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    setFilter,
    setSearchQuery,
  } = useTodoStore();

  const { background, display } = useSettingsStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(
    display.showSearchByDefault
  );

  // 필터링된 todos
  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);

    const matchesSearch =
      !searchQuery ||
      todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.notes &&
        todo.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

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

  // 편집 시작
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // 편집 저장
  const saveEdit = (id: string) => {
    if (editText.trim()) {
      updateTodo(id, { text: editText.trim() });
      setEditingId(null);
      setEditText("");
    }
  };

  // 편집 취소
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // 현재 날짜 정보
  const currentDate = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const currentDay = days[currentDate.getDay()];
  const currentMonth = currentDate.getMonth() + 1;
  const currentDateNum = currentDate.getDate();

  return (
    <div className="min-h-screen relative">
      {/* 배경 이미지 - 전체 화면을 덮음 */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            background.image.startsWith("#") ||
            background.image.startsWith("linear-gradient")
              ? "none"
              : `url(${background.image})`,
          backgroundColor: background.image.startsWith("#")
            ? background.image
            : "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: `blur(${background.blur}px)`,
        }}
      />

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 옵션 메뉴 */}
      <OptionsMenu
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
      />

      {/* 할 일 추가 모달 */}
      <AddTodoModal
        isOpen={isAddTodoOpen}
        onClose={() => setIsAddTodoOpen(false)}
        onSubmit={addTodo}
      />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10">
        {/* 헤더 - 배경 완전 투명 */}
        <div className="border-b border-white/20">
          <div className="flex items-center justify-between p-4">
            {/* 왼쪽: 메뉴 버튼 */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* 중앙: 제목과 날짜 */}
            <div className="text-center">
              <h1 className="text-xl font-bold text-white drop-shadow-lg">
                오늘 할 일
              </h1>
              <p className="text-white/90 text-sm drop-shadow-md">
                {currentMonth}월 {currentDateNum}일 {currentDay}요일
              </p>
            </div>

            {/* 오른쪽: 옵션 버튼들 */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsOptionsOpen(true)}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 (토글 가능) */}
        <div
          className={`transition-all duration-300 ${
            isSearchVisible
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="p-4 space-y-3">
            {/* 검색 */}
            <div className="relative">
              <input
                type="text"
                placeholder="할 일 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* 필터 버튼들 */}
            <div className="flex gap-2">
              {(["all", "active", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors backdrop-blur-sm ${
                    filter === f
                      ? "bg-white/30 text-white border border-white/50"
                      : "bg-white/20 text-white/90 hover:bg-white/30 border border-white/30"
                  }`}
                >
                  {f === "all" && "전체"}
                  {f === "active" && "진행중"}
                  {f === "completed" && "완료"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 검색 토글 버튼 */}
        <div className="flex justify-center py-2">
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="px-4 py-2 text-white/80 hover:text-white text-sm transition-colors backdrop-blur-sm hover:bg-white/20 rounded-lg"
          >
            {isSearchVisible ? "검색 숨기기" : "검색 보이기"}
          </button>
        </div>

        {/* Todo 목록 */}
        <div className="px-4 pb-24">
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center text-white/90 py-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                {searchQuery
                  ? "검색 결과가 없습니다."
                  : "할 일이 없습니다. 새로운 할 일을 추가해보세요!"}
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`bg-white/15 backdrop-blur-sm rounded-xl border border-white/25 p-4 transition-all hover:bg-white/25 ${
                    todo.completed ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* 체크박스 */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-1 bg-white/20 border-white/30"
                    />

                    {/* 할 일 내용 */}
                    <div className="flex-1 min-w-0">
                      {/* 편집 모드 */}
                      {editingId === todo.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 px-3 py-1 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(todo.id);
                              if (e.key === "Escape") cancelEdit();
                            }}
                          />
                          <button
                            onClick={() => saveEdit(todo.id)}
                            className="px-3 py-1 bg-green-600/80 text-white rounded hover:bg-green-600 text-sm backdrop-blur-sm"
                          >
                            저장
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-gray-600/80 text-white rounded hover:bg-gray-600 text-sm backdrop-blur-sm"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span
                            className={`text-lg font-medium ${
                              todo.completed
                                ? "line-through text-white/60"
                                : "text-white"
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
                            {
                              categories.find((cat) => cat.id === todo.category)
                                ?.name
                            }
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
                      {editingId !== todo.id && (
                        <button
                          onClick={() => startEdit(todo)}
                          className="p-2 text-blue-300 hover:text-blue-200 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
                          title="편집"
                        >
                          ✏️
                        </button>
                      )}
                      <button
                        onClick={() => deleteTodo(todo.id)}
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
              ))
            )}
          </div>
        </div>

        {/* 하단 액션 바 - 배경 완전 투명 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex items-center justify-between gap-4">
            {/* 작업 추가 버튼 - 반투명하고 화면 너비에 맞게 */}
            <button
              onClick={() => setIsAddTodoOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
            >
              <span className="text-2xl">+</span>
              <span className="text-lg font-medium">작업 추가</span>
            </button>

            {/* 완료된 할 일 정리 버튼 */}
            {todos.some((todo) => todo.completed) && (
              <button
                onClick={clearCompleted}
                className="px-6 py-4 bg-red-500/80 text-white rounded-xl hover:bg-red-500 transition-colors backdrop-blur-sm border border-red-400/50"
              >
                완료된 할 일 정리
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
