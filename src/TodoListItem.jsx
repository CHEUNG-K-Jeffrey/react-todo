/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./TodoListItem.module.css";
const TodoListItem = (props) => {
  const { todo, onRemoveTodo } = props;
  return (
    <li className={style.ListItem}>
      {todo.title}
      <button
        className={style.ListButton}
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
      >
        <FontAwesomeIcon icon="fa-solid fa-trash" />
      </button>
    </li>
  );
};

export default TodoListItem;
