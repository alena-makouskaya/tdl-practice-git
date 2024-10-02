import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TasksPropsType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type FilterValueType = "all" | "active" | "completed";

function App() {
  console.log("App is called");
  let [tasks, setTasks] = useState<TasksPropsType[]>([
    {
      id: v1(),
      title: "HTML",
      isDone: true,
    },
    {
      id: v1(),
      title: "CSS",
      isDone: true,
    },
    {
      id: v1(),
      title: "JS",
      isDone: false,
    },
  ]);

  let [filter, setFilter] = useState<FilterValueType>("all");

  const removeTask = (taskId: string) => {
    let newTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(newTasks);
  };

  const addTask = (title: string) => {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };

    setTasks([newTask, ...tasks]);
  };

  const changeTodolistFilter = (filter: FilterValueType) => {

    setFilter(filter)
  }

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = filteredTasks.filter((t) => t.isDone === false);
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.isDone === true);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn?"
        tasks={filteredTasks}

        removeTask={removeTask}
        addTask={addTask}
        changeTodolistFilter={changeTodolistFilter}
      />
    </div>
  );
}

export default App;
