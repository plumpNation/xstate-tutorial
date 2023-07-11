import { createMachine, assign } from "xstate";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface NewTodo extends Omit<Todo, 'id'> {
  id: null;
}

export const todoMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHRo7AMqgIYQCWAdlAMQblhYUBuqA1vbpjupoSRVAiaoAxkWSlU5ANoAGALqy5iUAAdMpcZOUgAHogBMAFgDsWIzIAchgIwXr1gMyWHAGhABPRA+MA2Mw4BWGScATn1jax8fYwBfGLcObETeMkoqMAAnDNQMrBUAGzEAMxyAWy48Cp5iVIEhUU1peUVtNVgNCXJtPQR9aLNDSxs7R2c3TwRbfSxDAKCQwxCIixDrEziE7iStlMgqABUAeQARQ4B9AGEAJQBRAEF9m5akEDaOrReenwWsHwD9Fbhawyb7GELjAwWUwOBbhGwyeyLawbECJKoXDJgMTsbgAMTKVFxhyuAFlLgAJO4AOQA4jdjs9VOpGt1ECEYVgLBYnBEYXNjK4PAYAqZ9H19CEQiD9A4LACAnF4iByOg4NpEq1mZ1WQgALQ+CEIPw+azGMHWMLGWaGG0WFFo5I1fia9osz6IQz6Q22PwInwyYxci0W1Z2pUOnY1SAu95dd0IAKzLDWMW+OYinxy8FC3pQzlcqyZnyBfQyBXhrZVWA3LI5aMvN5u0A9f4BX4OWUyMWe4x+w0-YFcha2Dv6C36e2VjgYrHIMAxpu6RAraz5nmOEL8wUTSIhLACgK2LsOEN2ByTyrTzHYqr4jKlBfa+NLCxYAKBEIWGSGBwm7-WQ1Alfb8jG5Qce2Mcs4iAA */
  schema: {
    services: {} as {
      fetchTodos: {
        data: Todo[];
      },
    },

    events: {} as
      | {
        type: "TODO_CREATE";
      }
      | {
        type: "FORM_CHANGED";
        value: string;
      }
  },

  tsTypes: {} as import("./todo-machine.typegen").Typegen0,

  id: 'todos',
  initial: "todosLoading",
  predictableActionArguments: true,

  context: {
    todos: [] as Todo[],
    errorMessage: undefined as string | undefined,
    newTodo: {} as NewTodo,
  },

  states: {
    todosLoading: {
      invoke: {
        src: "fetchTodos",
        onDone: [
          {
            target: "todosLoaded",
            actions: "assignTodosToContext",
          },
        ],
        onError: [
          {
            target: "todosErrored",
            actions: "assignErrorToContext",
          },
        ],
      },
    },

    todosLoaded: {
      on: {
        TODO_CREATE: {
          target: "todoCreate",
        }
      },
    },

    todosErrored: {},

    todoCreate: {
      initial: "todoForm",
      states: {
        todoForm: {
          on: {
            FORM_CHANGED: {
              actions: "assignFormToContext",
            },
          },
        }
      },
    }
  },
}, {
  actions: {
    assignTodosToContext: assign((context, event) => ({
      todos: event.data,
    })),

    assignErrorToContext: assign((context, event) => ({
      errorMessage: (event.data as Error).message,
    })),

    assignFormToContext: assign((context, event) => ({
      newTodo: {
        id: null,
        title: event.value,
        completed: false,
      },
    })),
  },
  // services: {
  //   fetchTodos: async () => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  //     const data = await response.json();
  //     return data as Todo[];
  //   },
  // },
});