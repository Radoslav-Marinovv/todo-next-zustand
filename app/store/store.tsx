import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { STATE_TODO, STATE_ONGOING, STATE_DONE } from '../constants/constants';
import { persist } from 'zustand/middleware';

export type StateTitle = typeof STATE_TODO | typeof STATE_ONGOING | typeof STATE_DONE;

export type Todo = {
  id: string;
  title: string;
  stateTitle: StateTitle;
  completed: boolean;
};

export type State = {
  todos: Todo[];
  onDrag: Todo['id'] | null;
}

export type Actions = {
  addTodo: (title: Todo['title']) => void;
  removeTodo: (id: Todo['id']) => void;
  changeCompleted: (id: Todo['id']) => void;
  changeTitle: (id: Todo['id'], newTitle: Todo['title']) => void;
  onDragStart: (id: Todo['id']) => void;
  onDragOver: (groupTitle: StateTitle) => void;
}



export const useTodoStore = create<State & Actions>()(
  persist(
    set => ({
      todos: [],
      onDrag: null,
      addTodo: (title: Todo['title']) => set(state => ({
        todos: [
          ...state.todos,
          { id: uuid(), title, stateTitle: STATE_TODO, completed: false }
        ]
      })),
      removeTodo: (id: Todo['id']) => set(state => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),
      changeCompleted: (id: Todo['id']) => set(state => ({
        todos: state.todos.map(todo =>
          todo.id === id ?
            { ...todo, completed: !todo.completed } :
            todo
        )
      })),
      changeTitle: (id: Todo['id'], newTitle: Todo['title']) => set(state => ({
        todos: state.todos.map(todo =>
          todo.id === id ?
            { ...todo, title: newTitle } :
            todo
        )
      })),
      onDragStart: (id: Todo['id']) => set(() => ({
        onDrag: id
      })),
      onDragOver: (groupTitle) => set(state => ({
        todos: state.todos.map(todo => {
          if (todo.id === state.onDrag) {
            return { ...todo, stateTitle: groupTitle };
          }
          return todo;
        }),
      }))
    }),
    {
      name: 'todo-storage',
    }));

export const getTodosByState = (todos: Todo[], stateTitle: StateTitle) =>
  todos.filter(todo => todo.stateTitle === stateTitle);

