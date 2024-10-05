import React, { useCallback } from "react";
import { TasksPropsType } from "./Todolist";
import { EditableSpan } from "./EditableSpan";

type TaskPropsType = {
    todolistId: string;
    task: TasksPropsType;
  
    removeTask: (todolistId: string, taskId: string) => void;
    changeTaskStatus: (
      todolistId: string,
      taskId: string,
      isDone: boolean
    ) => void;
    editTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  };
  
  export const Task = React.memo ((props: TaskPropsType) => {
    const { todolistId, task,  changeTaskStatus, removeTask, editTaskTitle } =
      props;

  
    const removeTaskHandler = useCallback(() => {
      removeTask(todolistId, task.id);
    }, [removeTask, todolistId, task.id]);
  
  
  
    const changeTaskStatusHandler = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistId, task.id, e.currentTarget.checked);
      },
      [changeTaskStatus, todolistId, task.id]
    );
  
    const editTaskTitleHandler = useCallback(
      (title: string) => {
        editTaskTitle(todolistId, task.id, title);
      },
      [editTaskTitle, todolistId, task.id]
    );
  
    return (
      <li>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeTaskStatusHandler}
        />
  
        <EditableSpan title={task.title} callBack={editTaskTitleHandler} />
        <button onClick={removeTaskHandler}> x </button>
      </li>
    );
  });
  