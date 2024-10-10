import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";
import { title } from "process";

export default {
  title: "API",
};

const token = "d88edc6b-c777-4866-93da-964c87f70fce";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
    // Authorization: `Bearer ${token}`,
  },
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistAPI.createTodolists("New Todolist").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "a95c213c-bf7c-45c5-bb7e-8e53e34fe373";

    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        // debugger
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "fcafc0ca-6aa8-45c8-867c-828f650be676";

    todolistAPI.updateTodolist(todolistId, "New Todolist Title")
      .then((res) => {
        // debugger
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {

  const [state, setState] = useState<any>(null)

  useEffect(() => {

    const todolistId = '68894149-7bde-41e7-a9ef-640527a5d92b'

    todolistAPI.getTasks(todolistId)
      .then((res) => {
        setState(res.data)
      })

  }, [])
}

export const DeleteTasks = () => {

  const [state, setState] = useState<any>(null)

  useEffect(() => {

    const todolistId = '68894149-7bde-41e7-a9ef-640527a5d92b'
    const taskId = '68894149-7bde-41e7-a9ef-640527a5d92b'

    todolistAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })

  }, [])
}
