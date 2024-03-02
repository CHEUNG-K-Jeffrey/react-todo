import './App.css'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'

const App = () => {
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </>
  )
}

export default App
