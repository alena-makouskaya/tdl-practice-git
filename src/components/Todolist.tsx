// @flow
import * as React from "react";
import { KeyboardEvent } from "react";
import { FilterValueType } from "../App";
export type TasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string;
  tasks: TasksPropsType[];

  removeTask: (taskId: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;

  changeTodolistFilter: (filetr: FilterValueType) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  console.log("Todolist is called");
  const {
    title,
    tasks,
    removeTask,
    addTask,
    changeTodolistFilter,
    changeTaskStatus,
  } = props;

  let [inputValue, setInputValue] = React.useState("");
  let [error, setError] = React.useState<null | string>(null);

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);

    if (error) {
      setError(null);
    }
  };

  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId);
  };

  const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
    changeTaskStatus(taskId, isDone);
  };

  const addTaskHandler = () => {
    if (inputValue.trim() !== "") {
      addTask(inputValue.trim());
      setInputValue("");
    } else {
      setError("Title is required");
    }
  };

  const changeTodolistFilterAll = () => {
    changeTodolistFilter("all");
  };

  const changeTodolistFilterActive = () => {
    changeTodolistFilter("active");
  };

  const changeTodolistFilterCompleted = () => {
    changeTodolistFilter("completed");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  return (
    <div className="tdlCard">
      <h3>{title}</h3>

      <div>
        <input
          type="text"
          value={inputValue}
          onChange={changeInputValueHandler}
          onKeyDown={onKeyDown}
          className={error ? "error" : ""}
        />
        <button onClick={addTaskHandler}> + </button>
        {error && <div className="errorText">{error}</div>}
      </div>

      <ul>
        {tasks.map((t) => {
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeTaskStatusHandler(t.id, e.currentTarget.checked)
                }
              />
              <span>{t.title}</span>
              <button onClick={() => removeTaskHandler(t.id)}> x </button>
            </li>
          );
        })}
      </ul>

      <div>
        <button onClick={changeTodolistFilterAll}>All</button>
        <button onClick={changeTodolistFilterActive}>Active</button>
        <button onClick={changeTodolistFilterCompleted}>Completed</button>
      </div>
    </div>
  );
};
