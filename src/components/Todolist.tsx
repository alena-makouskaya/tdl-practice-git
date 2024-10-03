// @flow
import * as React from "react";
import { KeyboardEvent } from "react";
import { FilterValueType, TasksStateType } from "../AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../state/store";
import { AddTaskAC, ChangeTaskStatusAC, EditTaskTitleAC, RemoveTaskAC } from "../state/tasks-reducer";
export type TasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  id: string;
  title: string;
  filter: FilterValueType;

  changeTodolistFilter: (todolistId: string, filter: FilterValueType) => void;
  removeTodolist: (todolistId: string) => void;
  editTodolistTitle: (todolistId: string, title: string) => void
};

export const Todolist = (props: TodolistPropsType) => {
  console.log("Todolist is called");
  const {
    id,
    title,
    filter,

    changeTodolistFilter,
    removeTodolist,
    editTodolistTitle
  } = props;

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, TasksPropsType[]>((state) => state.tasks[id] )

  const removeTask = (todolistId: string, taskId: string) => {
    let action = RemoveTaskAC(todolistId, taskId);
    dispatch(action);
  };

  const addTask = (todolistId: string, title: string) => {
    let action = AddTaskAC(todolistId, title);
    dispatch(action);
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    let action = ChangeTaskStatusAC(todolistId, taskId, isDone);
    dispatch(action);
  };

  const editTaskTitle = (todolistId: string, taskId: string, title: string) => {
    let action = EditTaskTitleAC(todolistId, taskId, title);
    dispatch(action);
  };


  const removeTaskHandler = (taskId: string) => {
    removeTask(id, taskId);
  };

  const addTaskHandler = (title: string) => {
    addTask(id, title);
  };

  const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
    changeTaskStatus(id, taskId, isDone);
  };

  const editTaskTitleHandler = (taskId: string, title: string) => {
    editTaskTitle(id, taskId, title);
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

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const editTodolistTitleHandler = (title: string) => {
    editTodolistTitle(id, title)
  }

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = filteredTasks.filter((t) => t.isDone === false);
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.isDone === true);
  }

  return (
    <div className="tdlCard" key={id}>
      <h3>
        <EditableSpan title={title} callBack={editTodolistTitleHandler} />
         - <button onClick={removeTodolistHandler}> x </button>
      </h3>

      <AddItemForm callBack={addTaskHandler} />

      <ul>
        {filteredTasks.map((t) => {
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeTaskStatusHandler(t.id, e.currentTarget.checked)
                }
              />
              {/* <span>{t.title}</span> */}
              <EditableSpan
                title={t.title}
                callBack={(title: string) => editTaskTitleHandler(t.id, title)}
              />
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
