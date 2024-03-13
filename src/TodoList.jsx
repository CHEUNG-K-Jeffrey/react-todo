import TodoListItem from "./TodoListItem";

let todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Review assignment" },
    { id: 3, title: "Submit Assignment" }
];

const TodoList = () => {
    return (
        <ul>
        {todoList.map((item) => (
          <TodoListItem key={item.key} todo={item}/>
        ))}
      </ul>
    )
}

export default TodoList;