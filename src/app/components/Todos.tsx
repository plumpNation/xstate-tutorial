'use client'

import React, { type FC } from 'react'
import { useMachine } from '@xstate/react'

import { todoMachine } from '../../todo-machine'

export const Todos: FC = () => {
  const [state, send] = useMachine(todoMachine, {
    services: {
      fetchTodos: async () => {
        // throw new Error("boom");

        return [
          { id: 1, title: 'Todo 1', completed: false },
          { id: 2, title: 'Todo 2', completed: false },
          { id: 3, title: 'Todo 3', completed: false },
        ];
      },
    },
  });

  return (
    <div>
      <h1>Todos</h1>
      <p>{JSON.stringify(state.value)}</p>
      <p>{JSON.stringify(state.context)}</p>

      {['todosLoaded'].some(state.matches) && (
        <button onClick={() => send('TODO_CREATE')}>Create new</button>
      )}

      {state.matches('todoCreate') && (
        <input onChange={(e) => send({ type: 'FORM_CHANGED', value: e.target.value })} />
      )}
    </div>
  )
}

export default Todos;