import "./App.css";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;
  const authenticationHeader = {
    Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
  };

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: { ...authenticationHeader },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok === false) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      const todos = data.records.map((todo) => {
        return { title: todo.fields.title, id: todo.id };
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.err(error);
      setIsLoading(false);
    }
  };

  const postData = async (todoTitle) => {
    if (!todoTitle) return;
    const airTableData = {
      fields: {
        title: todoTitle,
      },
    };
    const options = {
      method: "POST",
      headers: {
        ...authenticationHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airTableData),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      fetchData();

      return data;
    } catch (error) {
      console.error("An error occurred while fetching data or parsing json");
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm
                onAddTodo={addTodo}
                onRemoveTodo={removeTodo}
                onPostData={postData}
              />
              {isLoading ? (
                <p>Loading list...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <>
              <h1>New Todo List</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
