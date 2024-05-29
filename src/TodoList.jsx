/* eslint-disable react/prop-types */
import TodoListItem from "./TodoListItem";
import style from "./TodoList.module.css";

const TodoList = (props) => {
  const { todoList, onRemoveTodo } = props;
  return (
    <ul className={style.TodoList}>
      {todoList.map((item) => (
        <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
