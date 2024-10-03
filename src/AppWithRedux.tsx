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

function AppWithRedux() {
  console.log("App is called");

  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistProps>>((state) => state.todolists )

  const changeTodolistFilter = (
    todolistId: string,
    filter: FilterValueType
  ) => {
    let action = changeTodolistFilterAC(todolistId, filter);
    dispatch(action);
  };

  const removeTodolist = (todolistId: string) => {
    let action = removeTodolistAC(todolistId);
    dispatch(action);
  };

  const addTodolist = (title: string) => {
    let action = addTodolistAC(title);
    dispatch(action);
  };

  const editTodolistTitle = (todolistId: string, title: string) => {
    let action = editTodolistTitleAC(todolistId, title);
    dispatch(action);
  };

  return (
    <div className="App">
      <AddItemForm callBack={(title: string) => addTodolist(title)} />

      {todolists.map((tl) => {


        return (
          <Todolist
            id={tl.id}
            title={tl.title}
            filter={tl.filter}

            changeTodolistFilter={changeTodolistFilter}
            removeTodolist={removeTodolist}
            editTodolistTitle={editTodolistTitle}
          />
        );
      })}
    </div>
  );
}

export default AppWithRedux;
