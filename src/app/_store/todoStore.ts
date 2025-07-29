import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoFormData } from "../_types/todo";

interface TodoStore {
  todos: Todo[];
  addTodo: (data: TodoFormData) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (data: TodoFormData) => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text: data.text,
          completed: false,
          createdAt: new Date(),
        };
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },
    }),
    {
      name: "todo-storage", // localStorage에 저장될 키 이름
    }
  )
);
