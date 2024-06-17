import { ReactNode } from "react";

export type Todo = {
  id: string;
  title: string;
};

export type TodoList = Todo[];

export interface TodoListItemProps {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
}

export interface TodoListProps {
  todoList: TodoList;
  onRemoveTodo: (id: string) => void;
}

export interface AddTodoFormProps {
  onAddTodo: (newTodo: string) => void;
}

export interface InputWithLabelProps {
  children: ReactNode;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todoTitle?: string;
}

export interface TodoContainerProps {
  tableName: string;
}
