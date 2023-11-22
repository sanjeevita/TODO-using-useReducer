import "./styles.css";
import React, { useReducer, useState } from "react";
export default function App() {
  const OPTIONS = {
    ADD_TODO: "add-todo",
    DELETE_TODO: "delete-todo",
    COMPLETE_TODO: "complete-todo",
    SEARCH_TODO: "search-todo"
  };
  const newTodo = (name) => {
    return {
      name: name,
      complete: false,
      key: Date.now()
    };
  };
  const reducer = (todos, work) => {
    switch (work.type) {
      case OPTIONS.ADD_TODO: {
        return [...todos, newTodo(work.payload.name)];
      }
      case OPTIONS.DELETE_TODO: {
        const newTodos = todos.filter((item, index) => {
          if (index !== work.payload.id) return item;
        });
        return newTodos;
      }
      case OPTIONS.COMPLETE_TODO: {
        const newTodos = todos.map((item, index) => {
          if (index === work.payload.id)
            return { ...item, complete: !item.complete };
          else return item;
        });
        return newTodos;
      }
      case OPTIONS.SEARCH_TODO: {
        return todos.filter((todo) => {
          if (todo.name === work.payload.search) return todo;
        });
      }
    }
  };
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <h1>TO DO list</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({
            type: OPTIONS.ADD_TODO,
            payload: { name: name }
          });
          setName("");
        }}
      >
        Add +
      </button>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() =>
          dispatch({ type: OPTIONS.SEARCH_TODO, payload: { search: search } })
        }
      >
        search
      </button>
      {todos.map((todo, i) => {
        return (
          <div>
            <h2>{todo.name}</h2>
            <button
              onClick={() =>
                dispatch({
                  type: OPTIONS.DELETE_TODO,
                  payload: { id: i }
                })
              }
            >
              delete
            </button>

            <button
              style={
                todo.complete
                  ? { backgroundColor: "red" }
                  : { backgroundColor: "white" }
              }
              onClick={() => {
                dispatch({
                  type: OPTIONS.COMPLETE_TODO,
                  payload: { id: i }
                });
              }}
            >
              complete
            </button>
          </div>
        );
      })}
    </div>
  );
}
