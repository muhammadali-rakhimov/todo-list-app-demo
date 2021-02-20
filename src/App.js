import { Fragment, useState, useEffect } from "react";
import app from "./App.module.css";
import Todo from "./components/Todo";

const App = () => {
  const [value, setValue] = useState("");
  const [select, setSelect] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [todos, setTodos] = useState([
    // {
    //   text: "Learn about React",
    //   isCompleted: false,
    // },
    // {
    //   text: "Meet friend for lunch",
    //   isCompleted: false,
    // },
    // {
    //   text: "Build really cool todo app",
    //   isCompleted: false,
    // },
  ]);

  useEffect(() => {
    getFromLocal();
  }, []);

  useEffect(() => {
    switch (select) {
      case "Completed":
        setFilteredTodos(todos.filter((todo) => todo.isCompleted === true));
        break;
      case "Uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.isCompleted === false));
        break;
      // final and default  <<All>> selection case, I believe
      default:
        setFilteredTodos(todos);
        break;
    }
    saveToLocal();
  }, [todos, select]);
  // }, [select]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    if (select == "All") {
      setTodos(newTodos);
    } else {
      alert("To Add Change Filtered Selection!");
    }
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];

    // if (newTodos[index].isCompleted === false) {
    //   newTodos[index].isCompleted = true;
    // } else if (newTodos[index].isCompleted === undefined) {
    //   newTodos[index].isCompleted = true;
    // } else {
    //   newTodos[index].isCompleted = false;
    // }
    newTodos[index].isCompleted = true;

    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  const saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getFromLocal = () => {
    if (localStorage.getItem("todos" === null)) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos")) || [];
      setTodos(todoLocal);
    }
  };

  return (
    <Fragment>
      <div className={app.container}>
        <h1 className={app.title}>React Todo List</h1>
        <div className={app.todo}>
          <div className={app.todo__input}>
            <form onSubmit={handleSubmit} className={app.todo__form}>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </form>
            <div onClick={handleSubmit}>+</div>
          </div>
          <div className={app.todo__select}>
            <select onChange={selectHandler}>
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Uncompleted">Uncompleted</option>
            </select>
          </div>
        </div>
        <br />
        {filteredTodos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default App;
