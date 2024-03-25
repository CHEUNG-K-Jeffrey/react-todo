/* eslint-disable react/prop-types */
const TodoListItem = (props) => {
  const { todo } = props;
  return <li>{todo.title}</li>;
};

export default TodoListItem;
