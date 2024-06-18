import { ReactNode } from "react";

export type Todo = {
  id: string;
  title: string;
};

export interface TodoListItemProps {
  todo: { id: string; title: string };
  onRemoveTodo: (id: string) => void;
}

export interface TodoListProps {
  todoList: Todo[];
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
