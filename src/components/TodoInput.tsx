import { Circle } from "lucide-react";
import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function AddInput() {
  const { addTodo } = useTodo();
  const [text, setText] = useState("");

  return (
    <div className="w-full px-6 md:px-0 md:max-w-[500px] mx-auto mt-10">
      <div className="flex items-center gap-4 relative">
        <input
          type="text"
          className="w-full p-4 rounded-md bg-gray-100 dark:bg-blue-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 ps-16"
          placeholder="Create a new todo..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          required
          autoFocus
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (text.trim()) {
                addTodo(text);
                setText("");
              }
            }
          }}
        />
        <Circle
          className="absolute left-4 text-gray-500 dark:text-gray-800"
          strokeWidth={1}
        />
      </div>
    </div>
  );
}
