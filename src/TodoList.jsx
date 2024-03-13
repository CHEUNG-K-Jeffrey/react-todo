let todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Review assignment" },
    { id: 3, title: "Submit Assignment" }
];

const TodoList = () => {
    return (
        <ul>
        {todoList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    )
}

export default TodoList;