/* eslint-disable react/prop-types */
import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./AddTodoForm.module.css";

const AddTodoForm = (props) => {
  const { onAddTodo, onPostData } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();
    try {
      const newTodo = await onPostData(todoTitle);
      onAddTodo({ title: newTodo.fields.title, id: newTodo.id });
      setTodoTitle("");
      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        handleTitleChange={handleTitleChange}
        handleAddTodo={handleAddTodo}
      >
        Title
      </InputWithLabel>
      <button className={style.AddTodoFormButton} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
