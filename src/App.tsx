import { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoContainer from "./components/TodoContainer";

export default function App() {
  return (
    <div className="text-lg bg-gray-200 dark:bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <TodoContainer />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function LoadingSpinner() {
  return <div className="text-center py-4">Loading...</div>;
}
