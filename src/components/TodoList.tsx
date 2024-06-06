/* eslint-disable react/prop-types */
import TodoListItem from "./TodoListItem";
import style from "./TodoList.module.css";
import { TodoListProps, Ttodo } from "../types";

const TodoList = (props: TodoListProps) => {
  const { todoList, onRemoveTodo } = props;
  return (
    <ul className={style.todoList}>
      {todoList.map((item: Ttodo) => (
        <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
