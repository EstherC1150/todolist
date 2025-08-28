export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: "low" | "medium" | "high";
  category?: string;
  dueDate?: Date;
  notes?: string;
}

export interface TodoFormData {
  text: string;
  priority: "low" | "medium" | "high";
  category?: string;
  dueDate?: Date;
  notes?: string;
}

export interface TodoCategory {
  id: string;
  name: string;
  color: string;
}
