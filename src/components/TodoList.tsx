import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Fragment, useMemo, useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, clearCompleted, filterTodos, reorderTodos } = useTodoContext();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const filteredTodos = useMemo(
    () => filterTodos(filter),
    [filter, filterTodos]
  );
  const onDragEnd = (result: DropResult) => {
    console.log("Drag ended:", result);
    if (!result.destination) return;

    const sourceIndex = todos.findIndex(
      (todo) => todo.id === result.draggableId
    );
    const destinationIndex = result.destination.index;
    console.log("Source index:", sourceIndex);
    console.log("Destination index:", destinationIndex);
    reorderTodos(sourceIndex, destinationIndex);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <Fragment>
            <ul
              className="mt-6 bg-gray-100 dark:bg-blue-900 rounded-md divide-y"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={`${todo.id}`}
                  index={index}
                >
                  {(provided) => <TodoItem todo={todo} provided={provided} />}
                </Draggable>
              ))}
              {provided.placeholder}
              <li className="flex items-center justify-between p-4 text-sm text-gray-600">
                <div>
                  <p>{filteredTodos.length} items left</p>
                </div>
                <div className="md:inline-flex items-center gap-4 hidden  ">
                  <button
                    className={
                      filter === "all"
                        ? "text-primary "
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-800 dark:hover:text-gray-100"
                    }
                    onClick={() => setFilter("all")}
                  >
                    All
                  </button>
                  <button
                    className={
                      filter === "active"
                        ? "text-primary "
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-800 dark:hover:text-gray-100"
                    }
                    onClick={() => setFilter("active")}
                  >
                    Active
                  </button>
                  <button
                    className={
                      filter === "completed"
                        ? "text-primary "
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-800 dark:hover:text-gray-100"
                    }
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </button>
                </div>
                <div>
                  <button
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-800 dark:hover:text-gray-100"
                    onClick={clearCompleted}
                  >
                    Clear Completed
                  </button>
                </div>
              </li>
            </ul>
            <div className="flex w-full items-center justify-center gap-4 md:hidden mt-6 px-6 dark:bg-blue-900 p-4 rounded-md  bg-gray-100">
              <button
                className={
                  filter === "all"
                    ? "text-primary "
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-800 dark:hover:text-gray-100"
                }
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={
                  filter === "active"
                    ? "text-primary "
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-800 dark:hover:text-gray-100"
                }
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={
                  filter === "completed"
                    ? "text-primary "
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-800 dark:hover:text-gray-100"
                }
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </Fragment>
        )}
      </Droppable>
    </DragDropContext>
  );
}
