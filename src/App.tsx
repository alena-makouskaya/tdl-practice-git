import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TasksPropsType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { title } from "process";

function App() {
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

  return (
    <div className="App">
      <Todolist title="What to learn?" tasks={tasks} />
    </div>
  );
}

export default App;
