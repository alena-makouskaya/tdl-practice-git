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
};

export const Todolist = (props: TodolistPropsType) => {
  const { title, tasks } = props;

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
            <li>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button> x </button>
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
