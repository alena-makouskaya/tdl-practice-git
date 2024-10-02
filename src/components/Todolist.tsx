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
  id: string;
  title: string;
  filter: FilterValueType;
  tasks: TasksPropsType[];

  removeTask: (todolistId: string, taskId: string) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;

  changeTodolistFilter: (todolistId: string, filter: FilterValueType) => void;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  console.log("Todolist is called");
  const {
    id,
    title,
    filter,
    tasks,
    removeTask,
    addTask,
    changeTodolistFilter,
    changeTaskStatus,
    removeTodolist,
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
    removeTask(id, taskId);
  };

  const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
    changeTaskStatus(id, taskId, isDone);
  };

  const addTaskHandler = () => {
    if (inputValue.trim() !== "") {
      addTask(id, inputValue.trim());
      setInputValue("");
    } else {
      setError("Title is required");
    }
  };

  const changeTodolistFilterAll = () => {
    changeTodolistFilter(id, "all");
  };

  const changeTodolistFilterActive = () => {
    changeTodolistFilter(id, "active");
  };

  const changeTodolistFilterCompleted = () => {
    changeTodolistFilter(id, "completed");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  return (
    <div className="tdlCard" key={id}>
      <h3>
        {title} - <button onClick={removeTodolistHandler}> x </button>
      </h3>

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
        <button
          className={filter === "all" ? "isActive" : ""}
          onClick={changeTodolistFilterAll}
        >
          All
        </button>
        <button
          className={filter === "active" ? "isActive" : ""}
          onClick={changeTodolistFilterActive}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "isActive" : ""}
          onClick={changeTodolistFilterCompleted}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
