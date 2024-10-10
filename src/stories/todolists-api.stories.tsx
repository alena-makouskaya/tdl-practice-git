import { useEffect, useState } from "react";
import axios from "axios";
import { title } from "process";
import { todolistAPI } from "../api/todolists-api";

export default {
  title: "API",
};

const setting = {
  withCredentials: true,
  headers: {
    "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
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
    todolistAPI
      .createTodolist(
        "Todolist Title: Is working in tech even worth it anymore?"
      )
      .then((res) => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    let todolistId = "73916fd-76df-4c97-9ea5-f981de8f8d5a";

    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    let todolistId = "573916fd-76df-4c97-9ea5-f981de8f8d5a";
    let title = "New Title - The Design Clarity of Wilhelm Wagenfeld";
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
