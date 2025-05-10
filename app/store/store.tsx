import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { STATE_TODO, STATE_ONGOING, STATE_DONE } from '../constants/constants';

export type StateTitle = typeof STATE_TODO | typeof STATE_ONGOING | typeof STATE_DONE;

export type Todo = {
  id: string;
  title: string;
  stateTitle: StateTitle;
  completed: boolean;
};

export type State = {
  todos: Todo[];
}

export type Actions = {
  addTodo: (title: Todo['title']) => void;
  removeTodo: (id: Todo['id']) => void;
  changeCompleted: (id: Todo['id']) => void;
  changeTitle: (id: Todo['id'], newTitle: Todo['title']) => void;
}

export const useTodoStore = create<State & Actions>()(set => ({
  todos: [],

  addTodo: (title) => set(state => ({
    todos: [
      ...state.todos,
      { id: uuid(), title, stateTitle: STATE_TODO, completed: false }
    ]
  })),
  removeTodo: (id) => set(state => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  changeCompleted: (id) => set(state => ({
    todos: state.todos.map(todo =>
      todo.id === id ?
        { ...todo, completed: !todo.completed } :
        todo
    )
  })),
  changeTitle: (id, newTitle) => set(state => ({
    todos: state.todos.map(todo =>
      todo.id === id ?
        { ...todo, title: newTitle } :
        todo
    )
  }))
}));

export const getTodosByState = (todos: Todo[], stateTitle: StateTitle) =>
  todos.filter(todo => todo.stateTitle === stateTitle);