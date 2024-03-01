import './App.css'

let todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Review assignment" },
  { id: 3, title: "Submit Assignment" }
];

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  )
}

export default App
