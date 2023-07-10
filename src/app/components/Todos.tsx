'use client'

import React, { type FC } from 'react'
import { useMachine } from '@xstate/react'

import { todoMachine } from '../../todo-machine'

export const Todos: FC = () => {
  const [state, send] = useMachine(todoMachine);

  return (
    <div>
      <h1>Todos</h1>
      <p>{state.value.toString()}</p>

      {['todosLoadingSuccess', 'todosLoadingFailed'].some(state.matches) && (
        <button onClick={() => send('TODOS_LOADING_REQUEST')}>Request todos</button>
      )}

      {['todosLoading'].some(state.matches) && (
        <button onClick={() => send('TODOS_LOADING_SUCCESS')}>Loaded todos</button>
      )}

      {['todosLoading'].some(state.matches) && (
        <button onClick={() => send('TODOS_LOADING_FAILURE')}>Todos error</button>
      )}
    </div>
  )
}

export default Todos;