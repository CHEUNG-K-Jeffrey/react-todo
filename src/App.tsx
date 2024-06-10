import style from "./App.module.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Ttodo, TtodoList } from "./types";
library.add(fas, far, fab);

const App = () => {
  const [todoList, setTodoList] = useState<TtodoList>([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;
  const authenticationHeader = {
    Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
  };

  const fetchTodoList = async () => {
    const options = {
      method: "GET",
      headers: { ...authenticationHeader },
    };
    try {
      const response = await fetch(
        `${url}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`,
        options
      );
      if (response.ok === false) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      const todos: TtodoList = data.records
.map((todo: { fields: { title: string }; id: string }) => {
          return { title: todo.fields.title, id: todo.id } as Ttodo;
        }) // Sort by descending order
        .sort((a: Ttodo, b: Ttodo) => {
          if (a.title < b.title) {
            return 1;
          } else if (a.title === b.title) {
            return 0;
          } else {
            return -1;
          }
        });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const postNewTodo = async (todoTitle: string) => {
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
      fetchTodoList();

      return { title: data.fields.title, id: data.id };
    } catch (error) {
      console.error("An error occurred while fetching data or parsing json");
      throw error;
    }
  };

  useEffect(() => {
    fetchTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo: Ttodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id: string) => {
    setTodoList(todoList.filter((listItem) => listItem.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className={style.heading}>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} onPostData={postNewTodo} />
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
