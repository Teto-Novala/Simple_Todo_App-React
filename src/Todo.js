import { useState } from "react";

function Todo() {
  const [activity, setActivity] = useState("");
  const [edit, setEdit] = useState({});
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  function generateID() {
    return Date.now();
  }

  function saveTodoHandler(e) {
    e.preventDefault();

    if (!activity) return setMessage("nama aktifitas belum di isi");

    setMessage("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
      };

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id === edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateID(),
        activity,
        done: false,
      },
    ]);
    setActivity("");
  }

  function removeTodoHandler(todoID) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== todoID;
    });
    setTodos(filteredTodos);
    if (edit.id) cancelEditHandler();
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler() {
    setEdit({});
    setActivity("");
  }

  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id === todo.id;
    });

    const updatedTodos = [...todos];

    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Simple Todo List</h1>
      {message && <p>{message}</p>}
      <form onSubmit={saveTodoHandler}>
        <div className="container-form">
          <input
            type="text"
            placeholder="Nama Aktifitas"
            value={activity}
            onChange={function (e) {
              setActivity(e.target.value);
            }}
          />
          <button type="submit">{edit.id ? "Simpan Edit" : "Tambah"}</button>
          {edit.id && <button onClick={cancelEditHandler}>Cancel</button>}
        </div>
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map(function (todo) {
            return (
              <li key={todo.id} className={todo.done ? "done-color" : ""}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={doneTodoHandler.bind(this, todo)}
                />
                {todo.activity} ({todo.done ? "selesai" : "belum selesai"})
                <button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
                <button onClick={removeTodoHandler.bind(this, todo.id)}>
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}

export default Todo;
