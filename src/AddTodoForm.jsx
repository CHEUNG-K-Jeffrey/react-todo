/* eslint-disable react/prop-types */
import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = (props) => {
  const { onAddTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    setTodoTitle("");
    onAddTodo({ title: todoTitle, id: Date.now() });
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        handleTitleChange={handleTitleChange}
        handleAddTodo={handleAddTodo}
      >
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
