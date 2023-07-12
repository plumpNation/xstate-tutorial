'use client'

import React, { type FC } from 'react'
import { useMachine } from '@xstate/react'

import { type Todo, todoMachine } from '../../todo-machine'

const todos = [] as Todo[];

let lastId = 0;

export const Todos: FC = () => {
  const [state, send, assign] = useMachine(todoMachine, {
    // You can override the services in each state.
    // This is useful for mocking out API calls
    // or for calling services with different parameters.
    services: {
      fetchTodos: async () => todos,

      saveTodo: async (context) => {
        if (!context.createTodo) {
          throw new Error('Cannot save without a todo');
        }

        const newTodo = {
          ...context.createTodo,
          id: lastId++,
        };

        todos.push(newTodo);
      },

      deleteTodo: async (context, event) => {
        // throw new Error("couldn't delete " + event.id);
        const index = todos.findIndex((todo) => todo.id === event.id);

        todos.splice(index, 1);
      },

      toggleTodo: async (context, event) => {
        const todo = todos.find((todo) => todo.id === event.id);

        if (!todo) {
          throw new Error('Todo not found');
        }

        todo.completed = !todo.completed;
      },
    },
  });

  return (
    <div>
      <h1>Todos</h1>
      <p>{JSON.stringify(state.value)}</p>
      <p>{JSON.stringify(state.context)}</p>

      {state.matches('todoDeleteErrored') && (
        <>
          <p>Delete errored: {state.context.errorMessage}</p>
          <button onClick={() => send("CANCEL_DELETE_ERROR")}>Close</button>
        </>
      )}

      {['todosLoaded'].some(state.matches) && (
        <>
          <ul>
            {state.context.todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => send({ type: 'TODO_TOGGLED', id: todo.id })}
                />
                <span>{todo.title}</span>
                <button onClick={() => send({ type: 'TODO_DELETED', id: todo.id })}>Delete</button>
                </li>
            ))}
          </ul>

          <button onClick={() => send('TODO_CREATE')}>Create new</button>
        </>
      )}

      {state.matches('todoCreate') && (
        <form onSubmit={(e) => (e.preventDefault(), send('FORM_SUBMITTED'))}>
          <input
            autoFocus
            onChange={(e) => send({ type: 'FORM_CHANGED', value: e.target.value })}
          />
        </form>
      )}
    </div>
  )
}

export default Todos;