import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bg-todo-mobile-light dark:bg-todo-mobile-dark md:bg-todo-desktop-light md:dark:bg-todo-desktop-dark bg-no-repeat bg-cover h-[200px] md:h-[300px] p-6 md:p-10">
      <div className="flex justify-between items-center max-w-[500px] mx-auto">
        <h1 className="text-3xl font-bold tracking-[0.3em] text-gray-100 uppercase">
          Todo
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
