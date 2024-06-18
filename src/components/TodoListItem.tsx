/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./TodoListItem.module.css";
import { TodoListItemProps } from "../types";

const TodoListItem = (props: TodoListItemProps) => {
  const { todo, onRemoveTodo } = props;

  return (
    <li className={style.listItem}>
      <span className={style.listText}>{todo.title}</span>
      <button
        title="Remove"
        className={style.listButton}
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
      >
        <FontAwesomeIcon icon={["fas", "trash"]} />
      </button>
    </li>
  );
};

export default TodoListItem;
