/* eslint-disable react/prop-types */
import style from "./TodoListItem.module.css";
const TodoListItem = (props) => {
  const { todo, onRemoveTodo } = props;
  return (
    <li className={style.ListItem}>
      {todo.title}
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
