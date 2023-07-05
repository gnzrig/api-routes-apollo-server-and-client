import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      if (editIndex !== null) {
        // If an edit is in progress, update the todo at the editIndex
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Otherwise, add a new todo to the todos array
        setTodos([...todos, newTodo]);
      }
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setNewTodo(todos[index]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>{editIndex !== null ? "Update" : "Add"}</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>Delete</button>
            <button onClick={() => editTodo(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
