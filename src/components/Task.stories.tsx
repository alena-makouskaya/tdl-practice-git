import { action } from "@storybook/addon-actions";
import { Task } from "./Task";

export default {
  title: "Task",
  component: Task,
};

const editTaskTitleCallBack = action("Status is changed");
const changeTaskStatusCallBack = action("Status is changed");
const removeTaskCallBack = action("Status is changed");

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        key={"1"}
        todolistId={"1"}
        task={{ id: "1", title: "HTML", isDone: true }}
        removeTask={removeTaskCallBack}
        changeTaskStatus={changeTaskStatusCallBack}
        editTaskTitle={editTaskTitleCallBack}
      />
      <Task
        key={"1"}
        todolistId={"1"}
        task={{ id: "2", title: "CSS", isDone: false }}
        removeTask={removeTaskCallBack}
        changeTaskStatus={changeTaskStatusCallBack}
        editTaskTitle={editTaskTitleCallBack}
      />
    </>
  );
};
