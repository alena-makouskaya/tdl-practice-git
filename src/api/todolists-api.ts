import { error } from "console";
import axios from "axios";

const token = "d88edc6b-c777-4866-93da-964c87f70fce";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
    // Authorization: `Bearer ${token}`,
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

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

type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: Array<TaskType>;
};

export type UpdateTaskType = {
    title: string
description: string
completed: boolean
status: number
priority: number
startDate: string
deadline: string
}

export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>("todo-lists");
  },

  createTodolists(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {
      title: title,
    });
  },

  deleteTodolist(id: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${id}`);
  },

  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${id}`, {
      title: title,
    });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },

  deleteTask(todolistId: string, taskId: string){
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`);    
  }
};
