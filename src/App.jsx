import "./App.css";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import { useEffect, useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
          },
        });
      }, 2000);
    });
    newPromise.then((result) => {
      setTodoList([...result.data.todoList]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((listItem) => listItem.id !== id));
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
{isLoading ? <p>Loading list...</p> : 
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} /> }
    </>
  );
};

export default App;
