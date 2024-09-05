import { DarkMode } from "./DarkMode";

export default function Header() {
  return (
    <header className="h-[300px] bg-[url('/images/bg-mobile-light.avif')] dark:bg-[url('/images/bg-mobile-dark.avif')] bg-no-repeat bg-cover md:bg-[url('/images/bg-desktop-light.avif')] dark:md:bg-[url('/images/bg-desktop-dark.avif')]">
      <div className="w-full px-6 md:px-0 md:max-w-[500px] mx-auto pt-20 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-100 uppercase tracking-[.25em]">
          Todo
        </h1>
        <DarkMode />
      </div>
    </header>
  );
}
