import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
export default function App() {
  return (
    <div className="text-lg bg-gray-200 dark:bg-gray-900 min-h-screen">
      <Header />
      <div className="w-full px-6 md:px-0 md:max-w-[500px] mx-auto -mt-48 ">
        <TodoInput />
        <TodoList />
      </div>
      <footer className="text-center text-gray-500 text-sm py-10">
        Drag and drop to reorder list
      </footer>
    </div>
  );
}
