import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  order: number;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (task: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  reorderTodos: (startIndex: number, endIndex: number) => void;
  clearCompleted: () => Promise<void>;
  filterTodos: (filter: "all" | "active" | "completed") => Todo[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("order", { ascending: true });

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data || []);
    }
  }

  async function addTodo(task: string) {
    const { data, error } = await supabase
      .from("todos")
      .insert({ task, completed: false, order: todos.length + 1 })
      .select();

    if (error) {
      console.error("Error adding todo:", error);
    } else if (data) {
      setTodos([...todos, data[0]]);
    }
  }

  async function toggleTodo(id: string) {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const { error } = await supabase
      .from("todos")
      .update({ completed: !todoToUpdate.completed })
      .eq("id", id);

    if (error) {
      console.error("Error toggling todo:", error);
    } else {
      setTodos(
        todos
          .map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
          .sort((a, b) => a.order - b.order)
      );
    }
  }

  async function deleteTodo(id: string) {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos(
        todos.filter((todo) => todo.id !== id).sort((a, b) => a.order - b.order)
      );
    }
  }

  async function clearCompleted() {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("completed", true);

    if (error) {
      console.error("Error clearing completed todos:", error);
    } else {
      setTodos(
        todos
          .filter((todo) => !todo.completed)
          .sort((a, b) => a.order - b.order)
      );
    }
  }

  function filterTodos(filter: "all" | "active" | "completed") {
    return todos
      .filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      })
      .sort((a, b) => a.order - b.order);
  }

  async function reorderTodos(startIndex: number, endIndex: number) {
    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(startIndex, 1);
    reorderedTodos.splice(endIndex, 0, removed);

    // Actualizar el orden localmente
    const updatedTodos = reorderedTodos.map((todo, index) => ({
      ...todo,
      order: index + 1,
    }));

    setTodos(updatedTodos);

    // Actualizar el orden en Supabase
    const { error } = await supabase
      .from("todos")
      .upsert(updatedTodos.map(({ id, order }) => ({ id, order })));

    if (error) {
      console.error("Error updating todo order:", error);
      // Revertir cambios locales si hay un error
      await fetchTodos();
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        reorderTodos,
        clearCompleted,
        filterTodos,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
