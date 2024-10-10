import { action } from "@storybook/addon-actions";
import { Task } from "./Task";
import { EditableSpan } from "./EditableSpan";

export default {
  title: "Editable Span",
  component: EditableSpan,
};

const callBack = action("EditableSpan is changed");

export const EditableSpanExample = () => {
  return (
    <EditableSpan title="Editable Span" callBack={callBack}/>

  );
};
