/* eslint-disable react/prop-types */
import { useState } from "react";

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
      <label htmlFor="todoTitle">Title</label>
      <input
        onChange={handleTitleChange}
        name="title"
        id="todoTitle"
        type="text"
        value={todoTitle}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
