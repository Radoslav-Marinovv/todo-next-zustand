import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type State = {
  todos: Todo[];
}

export type Actions = {
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  changeCompleted: (id: string) => void;
  changeTitle: (id: string, newTitle: string) => void;
}

export const useTodoStore = create<State & Actions>()(set => ({
  todos: [],

  addTodo: (title: string) => set(state => ({
    todos: [
      ...state.todos,
      { id: uuid(), title, completed: false }
    ]
  })),
  removeTodo: (id: string) => set(state => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  changeCompleted: (id: string) => set(state => ({
    todos: state.todos.map(todo =>
      todo.id === id ?
        { ...todo, completed: !todo.completed } :
        todo
    )
  })),
  changeTitle: (id: string, newTitle: string) => set(state => ({
    todos: state.todos.map(todo =>
      todo.id === id ?
        { ...todo, title: newTitle } :
        todo
    )
  }))
}))