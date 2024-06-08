import { ReactNode } from "react";

export type Ttodo = {
  id: string;
  title: string;
};

export type TtodoList = Ttodo[];

export interface TodoListItemProps {
  todo: Ttodo;
  onRemoveTodo: (id: string) => void;
}

export interface TodoListProps {
  todoList: TtodoList;
  onRemoveTodo: (id: string) => void;
}

export interface AddTodoFormProps {
  onAddTodo: (newTodo: Ttodo) => void;
  onPostData: (todoTitle: string) => Promise<Ttodo | undefined>;
}

export interface InputWithLabelProps {
  children: ReactNode;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todoTitle?: string;
}
