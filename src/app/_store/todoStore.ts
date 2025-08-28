import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoFormData, TodoCategory } from "../_types/todo";

interface TodoStore {
  todos: Todo[];
  categories: TodoCategory[];
  filter: "all" | "active" | "completed";
  searchQuery: string;
  addTodo: (data: TodoFormData) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  clearCompleted: () => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
  setSearchQuery: (query: string) => void;
  addCategory: (category: Omit<TodoCategory, "id">) => void;
  deleteCategory: (id: string) => void;
}

const defaultCategories: TodoCategory[] = [
  { id: "1", name: "개인", color: "#3B82F6" },
  { id: "2", name: "업무", color: "#10B981" },
  { id: "3", name: "학습", color: "#F59E0B" },
  { id: "4", name: "건강", color: "#EF4444" },
];

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      categories: defaultCategories,
      filter: "all",
      searchQuery: "",

      addTodo: (data: TodoFormData) => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text: data.text,
          completed: false,
          createdAt: new Date(),
          priority: data.priority,
          category: data.category,
          dueDate: data.dueDate,
          notes: data.notes,
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

      updateTodo: (id: string, updates: Partial<Todo>) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      setFilter: (filter: "all" | "active" | "completed") => {
        set({ filter });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      addCategory: (category: Omit<TodoCategory, "id">) => {
        const newCategory: TodoCategory = {
          ...category,
          id: Date.now().toString(),
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      deleteCategory: (id: string) => {
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
          todos: state.todos.map((todo) =>
            todo.category === id ? { ...todo, category: undefined } : todo
          ),
        }));
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
