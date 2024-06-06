/* eslint-disable react/prop-types */
import { FormEvent, useState } from "react";
import InputWithLabel from "./InputWithLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./AddTodoForm.module.css";
import { AddTodoFormProps } from "../types";

const AddTodoForm = (props: AddTodoFormProps) => {
  const { onAddTodo, onPostData } = props;
  const [todoTitle, setTodoTitle] = useState("");
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const newTodo = await onPostData(todoTitle);
      if (newTodo) {
        onAddTodo(newTodo);
      } else {
        throw new Error("Error while adding undefined or null todo");
      }
      setTodoTitle("");
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={style.todoForm} onSubmit={handleAddTodo}>
      <InputWithLabel handleTitleChange={handleTitleChange}>
        Title
      </InputWithLabel>
      <button title="Add" className={style.addTodoFormButton} type="submit">
        <FontAwesomeIcon icon={["fas", "plus"]} />
      </button>
    </form>
  );
};

export default AddTodoForm;
