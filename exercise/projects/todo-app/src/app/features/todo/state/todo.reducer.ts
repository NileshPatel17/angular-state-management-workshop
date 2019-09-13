import uuid from 'uuid/v4';
import { Action, createReducer, on } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { Todo, TodoFilter } from './todo.model';

export const todoFeatureKey = 'todo';

export interface State {
  items: {
    [id: string]: Todo;
  };
  selectedTodoId: string;
  todoFilter: TodoFilter;
}

const id1 = uuid();
const id2 = uuid();
const id3 = uuid();
const id4 = uuid();

export const initialState: State = {
  items: {
    [id1]: { id: id1, title: 'Sign up for NgRx', done: true },
    [id2]: { id: id2, title: 'Learn NgRx', done: false },
    [id3]: { id: id3, title: 'Use NgRx in your apps', done: false },
    [id4]: {
      id: id4,
      title: 'Implement amazing features for users',
      done: false
    }
  },
  selectedTodoId: undefined,
  todoFilter: 'ALL'
};

const todoReducer = createReducer(
  initialState,

  on(TodoActions.addTodo, (state, { title }) => {
    const id = uuid();
    return {
      ...state,
      items: {
        ...state.items,
        [id]: {
          id,
          title,
          done: false
        }
      }
    };
  }),

  on(TodoActions.toggleTodo, (state, { id }) => {
    const todo = state.items[id];
    return {
      ...state,
      items: {
        ...state.items,
        [id]: {
          ...todo,
          done: !todo.done
        }
      }
    };
  }),

  on(TodoActions.removeTodo, (state, { id }) => {
    const newState = {
      ...state,
      items: {
        ...state.items
      }
    };
    delete newState.items[id];
    return newState;
  }),

  on(TodoActions.removeDoneTodos, state => {
    const notDoneIds = Object.values(state.items)
      .filter(item => !item.done)
      .map(item => item.id);
    return {
      ...state,
      items: notDoneIds.reduce((result, nextId) => {
        result[nextId] = state.items[nextId];
        return result;
      }, {})
    };
  }),

  on(TodoActions.filterTodos, (state, { filter }) => ({
    ...state,
    todoFilter: filter
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}