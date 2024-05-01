/* eslint-disable react/prop-types */
import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = (props) => {
  const { onAddTodo, onRemoveTodo, onPostData } = props;
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
    } catch (error) {
      onRemoveTodo(null);
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
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
