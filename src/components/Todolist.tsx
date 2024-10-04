// @flow
import * as React from "react";
import { ChangeEvent, KeyboardEvent, useCallback } from "react";
import { FilterValueType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
export type TasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  id: string;
  title: string;
  filter: FilterValueType;
  tasks: TasksPropsType[];

  removeTask: (todolistId: string, taskId: string) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void;

  changeTodolistFilter: (todolistId: string, filter: FilterValueType) => void;
  removeTodolist: (todolistId: string) => void;
  editTodolistTitle: (todolistId: string, title: string) => void;
};

export const Todolist = React.memo((props: TodolistPropsType) => {
  const {
    id,
    title,
    filter,
    tasks,
    removeTask,
    addTask,
    changeTodolistFilter,
    changeTaskStatus,
    removeTodolist,
    editTaskTitle,
    editTodolistTitle,
  } = props;

  console.log(`Todolist is called ${id}`);

  const removeTaskHandler = (taskId: string) => {
    removeTask(id, taskId);
  };

  const addTaskHandler = useCallback(
    (title: string) => {
      addTask(id, title);
    },
    [addTask, id]
  );

  const changeTaskStatusHandler = useCallback( (taskId: string, isDone: boolean) => {
    changeTaskStatus(id, taskId, isDone);
  }, [changeTaskStatus, id]);

  const editTaskTitleHandler = useCallback(
    (taskId: string, title: string) => {
      editTaskTitle(id, taskId, title);
    },
    [editTaskTitle, id]
  );

  const changeTodolistFilterAll = useCallback(() => {
    changeTodolistFilter(id, "all");
  }, [changeTodolistFilter, id]);

  const changeTodolistFilterActive = useCallback(() => {
    changeTodolistFilter(id, "active");
  }, [changeTodolistFilter, id]);

  const changeTodolistFilterCompleted = useCallback(() => {
    changeTodolistFilter(id, "completed");
  }, [changeTodolistFilter, id]);

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const editTodolistTitleHandler = useCallback(
    (title: string) => {
      // console.log(`editTodolistTitleHandler ${id}`)
      editTodolistTitle(id, title);
    },
    [editTodolistTitle, id]
  );

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((t) => t.isDone === false);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.isDone === true);
  }

  return (
    <div className="tdlCard" key={id}>
      <h3>
        <EditableSpan title={title} callBack={editTodolistTitleHandler} />-{" "}
        <button onClick={removeTodolistHandler}> x </button>
      </h3>

      <AddItemForm callBack={addTaskHandler} />

      <ul>
        {filteredTasks.map((t, index) => {


          return (
            <Task
            key={index}
            id={t.id}
            title={t.title}
            isDone={t.isDone}
            changeTaskStatus={changeTaskStatusHandler}
            editTaskTitle={editTaskTitleHandler}
            removeTask={removeTaskHandler}
          />

            // <li key={index}>
            //   <input
            //     type="checkbox"
            //     checked={t.isDone}
            //     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            //       changeTaskStatusHandler(t.id, e.currentTarget.checked)
            //     }
            //   />
            //   {/* <span>{t.title}</span> */}
            //   <EditableSpan
            //     title={t.title}
            //     callBack={(title: string) => editTaskTitleHandler(t.id, title)}
            //   />
            //   <button onClick={() => removeTaskHandler(t.id)}> x </button>
            // </li>
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
});

type TaskPropsType = {
  id: string;
  title: string;
  isDone: boolean;

  editTaskTitle: (taskId: string, title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  removeTask: (taskId: string) => void;
};

const Task = React.memo((props: TaskPropsType) => {
  const { id, title, editTaskTitle, isDone, changeTaskStatus, removeTask } =
    props;

  const changeTaskStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(id, e.currentTarget.checked);
  }, [changeTaskStatus, id]);

  const editTaskTitleHandler = useCallback ((title: string) => {
    editTaskTitle(id, title);
  }, [editTaskTitle, id]);

  const removeTaskHandler = useCallback (() => {
    removeTask(id);
  }, [id]);

  return (
    <li>
      <input
        type="checkbox"
        checked={isDone}
        onChange={changeTaskStatusHandler}
      />

      <EditableSpan title={title} callBack={editTaskTitleHandler} />
      <button onClick={removeTaskHandler}> x </button>
    </li>
  );
});
