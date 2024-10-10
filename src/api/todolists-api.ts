import { title } from "process";
import axios from "axios";
import { DeleteTodolist } from "../stories/todolists-api.stories";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
  },
};

export const todolistAPI = {
  getTodolists() {
    return axios.get(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      settings
    );
  },

  createTodolist(title: string) {
    return axios.post(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      { title: title },
      settings
    );
  },

  deleteTodolist(id: string) {
    return axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
      settings
    );
  },

  updateTodolist(id: string, title: string) {
    return axios.put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
      {
        title: title,
      },
      settings
    );
  },
};
