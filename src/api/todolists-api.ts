import { title } from "process";
import axios from "axios";
import { DeleteTodolist } from "../stories/todolists-api.stories";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    description: string;
    title: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
  };

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: Array<TaskType>;
  };

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>("todo-lists");
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{item: TodolistType}>>("todo-lists", { title: title });
  },

  deleteTodolist(id: string) {
    return instance.delete<ResponseType<{}>>(
      `todo-lists/${id}`
    );
  },

  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType<{}>>(
      `todo-lists/${id}`,
      {
        title: title,
      }
    );
  },
};
