import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AppThunkDispatch, getTodosAsync, TodoState } from "../redux/todoSlice";

import TodoItem from "./TodoItem";

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppThunkDispatch>();
  const todos: Array<TodoState> = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTodosAsync()).finally(()=> setIsLoading(false));
  }, [dispatch])

  return (
    <ul className="list-group">
      {!isLoading && todos.map((todo, i) => (
        <TodoItem
          key={i}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList;
