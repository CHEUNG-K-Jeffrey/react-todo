/* eslint-disable react/prop-types */
import TodoListItem from "./TodoListItem";

const TodoList = (props) => {
  const { todoList, onRemoveTodo } = props;
  return (
    <ul>
      {todoList.map((item) => (
        <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
