"use client";

import TodoForm from "./_components/TodoForm";
import { useTodoStore } from "./_store/todoStore";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📝 Todo 리스트
        </h1>

        <TodoForm onSubmit={addTodo} />

        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              할 일이 없습니다. 새로운 할 일을 추가해보세요!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border ${
                  todo.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  삭제
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
