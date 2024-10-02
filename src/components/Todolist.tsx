// @flow
import * as React from "react";
export type TasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string;
  tasks: TasksPropsType[];

  removeTask: (taskId: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  console.log("Todolist is called");
  const { title, tasks, removeTask } = props;

  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId);
  };

  return (
    <div className="tdlCard">
      <h3>{title}</h3>

      <div>
        <input type="text" />
        <button> + </button>
      </div>

      <ul>
        {tasks.map((t) => {
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} onChange={() => {}}/>
              <span>{t.title}</span>
              <button onClick={() => removeTaskHandler(t.id)}> x </button>
            </li>
          );
        })}
      </ul>

      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
