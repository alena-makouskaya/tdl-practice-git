import React, { useCallback, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TasksPropsType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { title } from "process";
import { AddItemForm } from "./components/AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  editTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  EditTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValueType = "all" | "active" | "completed";

export type TodolistProps = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [key: string]: TasksPropsType[];
};

const AppWithRedux = React.memo(() => {
  console.log("App is called");

  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistProps>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      let action = RemoveTaskAC(todolistId, taskId);
      dispatch(action);
    },
    [dispatch]
  );

  const addTask = useCallback(
    (todolistId: string, title: string) => {
      let action = AddTaskAC(todolistId, title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, isDone: boolean) => {
      let action = ChangeTaskStatusAC(todolistId, taskId, isDone);
      dispatch(action);
    },
    [dispatch]
  );

  const editTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      let action = EditTaskTitleAC(todolistId, taskId, title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodolistFilter = useCallback(
    (todolistId: string, filter: FilterValueType) => {
      let action = changeTodolistFilterAC(todolistId, filter);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      let action = removeTodolistAC(todolistId);
      dispatch(action);
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      let action = addTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const editTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      let action = editTodolistTitleAC(todolistId, title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <AddItemForm callBack={addTodolist} />

      {todolists.map((tl, index) => {
        let allTasks = tasks[tl.id];
        let filteredTasks = allTasks;

        return (
          <Todolist
            key={index}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={filteredTasks}
            removeTask={removeTask}
            addTask={addTask}
            editTaskTitle={editTaskTitle}
            changeTaskStatus={changeTaskStatus}
            changeTodolistFilter={changeTodolistFilter}
            removeTodolist={removeTodolist}
            editTodolistTitle={editTodolistTitle}
          />
        );
      })}
    </div>
  );
});

export default AppWithRedux;
