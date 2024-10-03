import { title } from "process";
import { FilterValueType, TodolistProps } from "../App";
import { v1 } from "uuid";

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todolistId: string;
  filter: FilterValueType;
};

export type EditTodolistTitleActionType = {
  type: "EDIT-TODOLIST-TITLE";
  todolistId: string;
  title: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  todolistId: string;
  title: string;
};

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};

export type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | EditTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  state: TodolistProps[],
  action: ActionType
): TodolistProps[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistId);
    }

    case "ADD-TODOLIST": {
      let newDolist: TodolistProps = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
      };

      return [newDolist, ...state];
    }

    case "EDIT-TODOLIST-TITLE": {
      let todolist = state.find((tl) => tl.id === action.todolistId);

      if (todolist) {
        todolist.title = action.title;
      }

      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.todolistId);

      if (todolist) {
        todolist.filter = action.filter;
      }

      return [...state];
    }

    default:
      throw new Error("I dont udnerstand this actopn type");
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return {
    type: "REMOVE-TODOLIST",
    todolistId,
  };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: "ADD-TODOLIST",
    todolistId: v1(),
    title,
  };
};

export const editTodolistTitleAC = (
  todolistId: string,
  title: string
): EditTodolistTitleActionType => {
  return {
    type: "EDIT-TODOLIST-TITLE",
    todolistId,
    title,
  };
};

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValueType
): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    filter,
  };
};
