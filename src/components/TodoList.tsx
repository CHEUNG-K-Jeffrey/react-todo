import TodoListItem from "./TodoListItem";
import style from "./TodoList.module.css";
import { Todo } from "../types";

export interface TodoListProps {
  todoList: Todo[];
  onRemoveTodo: (id: string) => void;
}

const TodoList = (props: TodoListProps) => {
  const { todoList, onRemoveTodo } = props;

  return (
    <ul className={style.todoList}>
      {todoList.map((item: Todo) => (
        <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
