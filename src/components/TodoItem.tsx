import { DraggableProvided } from "@hello-pangea/dnd";
import { Check, X } from "lucide-react";
import { useTodoContext } from "../context/TodoContext";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoItem({
  todo,
  provided,
}: Readonly<{ todo: Todo; provided: DraggableProvided }>) {
  const { toggleTodo, deleteTodo } = useTodoContext();
  return (
    <li
      className="p-4 flex items-center"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        className={`flex items-center justify-center size-6 rounded-2xl hover:bg-gradient-to-r overflow-hidden hover:from-gradient-start hover:to-gradient-end mr-6 bg-gray-200 p-px
    ${todo.completed && "bg-gradient-to-r from-gradient-start to-gradient-end"}
  `}
      >
        <button
          className={`size-full flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden ${
            !todo.completed && "bg-gray-100 dark:bg-blue-900"
          }`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.completed && <Check className="w-3 h-3 text-gray-100" />}
        </button>
      </div>

      <div className="flex items-center gap-4 group/item w-full justify-between">
        <p
          className={`text-base font-normal justify-self-center flex-none group cursor-pointer ${
            todo.completed
              ? "line-through text-gray-200 dark:text-gray-700"
              : "text-blue-900 dark:text-gray-300"
          }`}
        >
          {todo.text}
        </p>
        <button
          className="invisible  group-hover/item:visible"
          onClick={() => deleteTodo(todo.id)}
        >
          <X className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
        </button>
      </div>
    </li>
  );
}
