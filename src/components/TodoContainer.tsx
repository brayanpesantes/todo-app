import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoContainer() {
  return (
    <div className="w-full px-6 md:px-0 md:max-w-[500px] mx-auto -mt-48">
      <TodoInput />
      <TodoList />
    </div>
  );
}
