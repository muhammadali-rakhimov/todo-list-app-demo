import React, { useState } from "react";
import todoStyle from "./Todo.module.css";

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <>
      <div className={todoStyle.todoStyle}>
        <div className={todoStyle.todoStyle__block}>
          <span
            className={todoStyle.todoStyle__text}
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
          >
            {todo.text}
          </span>
          <div className={todoStyle.todoStyle__insert}>
            <div
              className={todoStyle.todoStyle__check}
              onClick={() => completeTodo(index)}
            >
              <i className="fas fa-check"></i>
            </div>
            <div
              className={todoStyle.todoStyle__trash}
              onClick={() => removeTodo(index)}
            >
              <i className="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
