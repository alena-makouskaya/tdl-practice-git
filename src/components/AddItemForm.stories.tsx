import { AddItemForm } from "./AddItemForm";

export default {
  title: "Add Item Form",
  component: AddItemForm
}

export const AddItemFormBaseExample = () => {
  return <AddItemForm callBack={(value: string) => console.log("Title")} />
}