/* eslint-disable react/prop-types */
import { FormEvent, useState } from "react";
import InputWithLabel from "./InputWithLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./AddTodoForm.module.css";
import { AddTodoFormProps } from "../types";

const AddTodoForm = (props: AddTodoFormProps) => {
  const { onAddTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = async (event: FormEvent) => {
    event.preventDefault();
    try {
      onAddTodo(todoTitle);
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
