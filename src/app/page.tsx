"use client";

import { useState } from "react";
import Sidebar from "./_components/Sidebar";
import OptionsMenu from "./_components/OptionsMenu";
import AddTodoModal from "./_components/AddTodoModal";
import Header from "./_components/Header";
import SearchAndFilter from "./_components/SearchAndFilter";
import TodoList from "./_components/TodoList";
import ActionBar from "./_components/ActionBar";
import { useTodoStore } from "./_store/todoStore";
import { useSettingsStore } from "./_store/settingsStore";

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

  // 편집 시작
  const startEdit = (todo: any) => {
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
        onClose={() => {
          setIsOptionsOpen(false);
        }}
      />

      {/* 할 일 추가 모달 */}
      <AddTodoModal
        isOpen={isAddTodoOpen}
        onClose={() => setIsAddTodoOpen(false)}
        onSubmit={addTodo}
      />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10">
        {/* 헤더 */}
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          onOptionsClick={() => setIsOptionsOpen(true)}
        />

        {/* 검색 및 필터 */}
        <SearchAndFilter
          searchQuery={searchQuery}
          filter={filter}
          isVisible={isSearchVisible}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilter}
          onToggleVisibility={() => setIsSearchVisible(!isSearchVisible)}
        />

        {/* Todo 목록 */}
        <TodoList
          todos={filteredTodos}
          categories={categories}
          searchQuery={searchQuery}
          editingId={editingId}
          editText={editText}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onStartEdit={startEdit}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onEditTextChange={setEditText}
        />

        {/* 하단 액션 바 */}
        <ActionBar
          hasCompletedTodos={todos.some((todo) => todo.completed)}
          onAddTodo={() => setIsAddTodoOpen(true)}
          onClearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
}
