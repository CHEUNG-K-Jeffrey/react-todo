import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import style from "./TodoContainer.module.css";
import { toast } from "react-toastify";
import { Todo } from "../types";
const { VITE_AIRTABLE_BASE_ID, VITE_AIRTABLE_API_TOKEN } = import.meta.env;
const url = `https://api.airtable.com/v0`;

const authenticationHeader = {
  Authorization: `Bearer ${VITE_AIRTABLE_API_TOKEN}`,
};

export interface TodoContainerProps {
  tableName: string;
}

const TodoContainer = (props: TodoContainerProps) => {
  const { tableName } = props;
  const [todoList, setTodoList] = useState<Todo[]>(new Array<Todo>());
  const [isLoading, setIsLoading] = useState(true);

  const addTodo = async (title: string) => {
    if (!title) return;
    try {
      const response = await fetch(
        `${url}/${VITE_AIRTABLE_BASE_ID}/${tableName}`,
        {
          method: "POST",
          headers: {
            ...authenticationHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              title: title,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // Set to sorted descending list
      setTodoList(
        [...todoList, { title: data.fields.title, id: data.id }].sort(
          (a: { title: string }, b: { title: string }) => {
            if (a.title < b.title) {
              return 1;
            } else if (a.title === b.title) {
              return 0;
            } else {
              return -1;
            }
          }
        )
      );
      toast.success(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Added task</span>
        </div>,
        {
          autoClose: 5000,
          hideProgressBar: false,
          toastId: data.id,
          containerId: "tasks",
        }
      );
    } catch (error) {
      console.error("An error occurred while fetching data or parsing json");
      throw error;
    }
  };

  const removeTodo = async (id: string) => {
    toast.success(
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Deleted task</span>
      </div>,
      {
        autoClose: 5000,
        hideProgressBar: false,
        toastId: id,
        containerId: "tasks",
      }
    );
    try {
      const response = await fetch(
        `${url}/${VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`,
        {
          method: "DELETE",
          headers: {
            ...authenticationHeader,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.deleted && data.id === id) {
        setTodoList(
          todoList.filter((listItem: { id: string }) => listItem.id !== id)
        );
      } else {
        throw new Error(`Error: Something went wrong while deleting.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Runs once when table loads
  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: { ...authenticationHeader },
      };
      try {
        const response = await fetch(
          `${url}/${VITE_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`,
          options
        );
        if (response.ok === false) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        const todos: [] = data.records
          .map((todo: { fields: { title: string }; id: string }) => {
            return { title: todo.fields.title, id: todo.id } as Todo;
          }) // Sort by descending order
          .sort((a: { title: string }, b: { title: string }) => {
            if (a.title < b.title) {
              return 1;
            } else if (a.title === b.title) {
              return 0;
            } else {
              return -1;
            }
          });
        setTodoList([...todos]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tableName]);

  return (
    <>
      <h1 className={style.heading}>{tableName}</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
};

export default TodoContainer;
