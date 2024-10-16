import axios from "axios";
import { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";

export default {
  title: "API",
};

const settings = {
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
    todolistAPI.createTodolist("New Todolist Title").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "cb8db48f-1f15-4281-98a1-ec7e3fd8ba13";

    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>(null);

  const todolistId = "dbbba888-aa88-409b-a914-f23b662ad00e";
  const newTitle = "Title changed";

  useEffect(() => {
    todolistAPI.updateTodolist(todolistId, newTitle).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);

  const todolistId = "dbbba888-aa88-409b-a914-f23b662ad00e";

  useEffect(() => {
    todolistAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  const deletetask = () => {
    const todolistId = "dbbba888-aa88-409b-a914-f23b662ad00e";
    const taskId = "";

    useEffect(() => {
      todolistAPI.deleteTask(todolistId, taskId).then((res) => {
        setState(res.data);
      });
    }, []);
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder="taskId"
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <button onClick={deletetask}>delete task</button>
      </div>
    </div>
  );
};
