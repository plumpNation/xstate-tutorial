import { createMachine, assign } from "xstate";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodo extends Omit<Todo, 'id'> {
  id: null;
}

export const todoMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHRo7AMqgIYQCWAdlAMQblhYUBuqA1vbpjupoSRVAiaoAxkWSlU5ANoAGALqy5iUAAdMpcZOUgAHogDMANgAsWQzICMFgOwAOAJzHbAJlvXrAGhABPAyazWMs4y+o4ArDahhgC+0V4c2Am8ZJRUYABO6ajpWCoANmIAZtkAtlx45TzEKQJCoprS8oraarAaEuTaegg29lgy1qEOQbbGYcbOhl6+CEamgcH6ViZOFrHx3ImbyZBUACoA8gAiBwD6AMIASgCiAIJ7181IIK3tWs-dwc5YxtYWYfYZJY-sYrM5poh7BZDFgwvonA53M4JoZ9OsQAlKgRqrtDidTkdrvhrg8jk9VOoGl1EABaQzWLBGf4hWzjGSGexhCEIQa2LD2QK2aEWUIDP7ozEcI5gPJgZBgGiSehCNhYyrS2XywTkZj1DqKckvSkdakIGnOGxYVn6fS2KLI2yjbk2CxYZGBAFhZx2P4xOIYzbqmVyhUZLI5fJFUpqqXBrV1MT6pryFrG96gT7GPquEX2Zx5kURcE+RAimR9G0WPPOIw1kxrf2S7gakPXTLZXbnW4AOXORIJRJJ11O10ulwOl0NrypH1pFicVrGqP0YQGzhrxmdRgZIotQS9xmM9IlgdjmrAbfDux0sGQYnoREK8vSAApgkCAJRUJsYFvyy8dhAU5pp0s5miK+j8lWrIyBMebmIYUwlj0xg2vyNr2Jh+ZhH8YQnhUHDnOkYD3pUABipRUGRE4ALIXAAEj2ADi1xkimzzTiaYFZjC1iYdYJiwXm7L6NyLiQX8UQitYYSGKu1j4ZwhHEaRHAUekJRUbRpwAMoAKoAEI0QAknspLAW0M4ZogdhhP0AKITIq6Hi4njIZyfLjMYIRVphCJ4Y2p7cERJHypUOlEIw-CKnQDA6qw7BBRgIWqdwEVRZQ2q6omkgGuxFKWVx1kIIYxYzEKrr6NYWYVSijhooFBHBSpYUcOl0VhtkuQFMgxQaTGzWhYlGDtZlCYNHlSgcSBpomN8UKua4HJGOMzqwTCVYcuJ7iWKCilbHgyTRbQyrxaqP5VHwY3xXquVNBYU0FW8oHFWEb38qygzlquyIyLY3IRK6a5OL8ITBIeAX+uQ6BwNoCSpoV6a6LSkx2datr2gim7IfOASOoCQKsv83qGA2GxNYd1T8Ajz2mhMa3fK4QJAlEqHBH65NKdsOIQDTVnIwgoJ8qyFoWKyAICYMXLIYhG2rvYSzjHxAlkwGFOYABxG89NiMvQLFiwT8LrQqT9gOPOSEzKiMKoZh+i-XJub7UG5580VAsyM6zirvyXqwXYVWArYztnq27Za27SPdJ7ONsz8rhjKuQpHvOIeDfekd690oqMpYCsHnY7KWzZRhuuutik+yqEgmnyUtcNqDqSUmd07audViu7q2EX3Jm66wSyQ4VXfWbteoClrVpZF1M67TYF2t8ITecTTj6OW9jOgbMKcuDAd8X9sSxEAA */
  id: 'todos',
  predictableActionArguments: true,

  schema: {
    services: {} as {
      fetchTodos: {
        data: Todo[];
      },
      saveTodo: {
        data: void;
      },
      deleteTodo: {
        data: void;
      },
      toggleTodo: {
        data: void;
      },
    },

    events: {} as
      | {
          type: "TODO_CREATE";
        }
      | {
          type: "TODO_TOGGLED";
          id: number;
        }
      | {
          type: "FORM_CHANGED";
          value: string;
        }
      | {
          type: "FORM_SUBMITTED";
        }
      | {
          type: "TODO_DELETED";
          id: number;
        }
      | {
          type: "CANCEL_DELETE_ERROR";
        }
  },

  tsTypes: {} as import("./todo-machine.typegen").Typegen0,

  context: {
    todos: [] as Todo[],
    errorMessage: undefined as string | undefined,
    createTodo: undefined as CreateTodo | undefined,
    deleteTodo: undefined as Todo | undefined,
  },

  initial: "todosLoading",

  states: {
    todosLoading: {
      invoke: {
        src: "fetchTodos",
        onDone: [
          {
            target: "todosLoaded",
            actions: "assignTodosToContext",
            cond: "hasTodos"
          },
          {
            target: "todoCreate",
          }
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
        },
        TODO_DELETED: {
          target: "todoDelete",
        },
        TODO_TOGGLED: {
          target: "todoUpdate",
        },
      },
    },

    todoUpdate: {
      invoke: {
        src: "toggleTodo",
        onDone: {
          target: "todosLoading",
        },
      },
    },

    todosErrored: {},

    todoDelete: {
      invoke: {
        src: "deleteTodo",
        onDone: [
          {
            target: "todosLoading",
          },
        ],
        onError: [
          {
            target: "todoDeleteErrored",
            actions: "assignDeleteErrorToContext",
          },
        ],
      },
    },

    todoDeleteErrored: {
      after: {
        2000: "todosLoading",
      },

      on: {
        CANCEL_DELETE_ERROR: "todosLoading"
      }
    },

    todoCreate: {
      initial: "todoForm",
      states: {
        todoForm: {
          on: {
            FORM_CHANGED: {
              actions: "assignFormToContext",
            },
            FORM_SUBMITTED: {
              target: "todoSaving",
            },
          },
        },

        todoSaving: {
          invoke: {
            src: "saveTodo",
            onError: "todoForm",
            onDone: {
              target: "#todos.todosLoading",
              actions: ["undefineFormToContext"]
            }
          },
        }
      },
    },
  },
}, {
  actions: {
    assignTodosToContext: assign((context, event) => ({
      todos: event.data,
    })),

    assignErrorToContext: assign((context, event) => ({
      errorMessage: (event.data as Error).message,
    })),

    assignDeleteErrorToContext: assign((context, event) => ({
      errorMessage: (event.data as Error).message,
    })),

    assignFormToContext: assign((context, event) => ({
      createTodo: {
        id: null,
        title: event.value,
        completed: false,
      },
    })),

    undefineFormToContext: assign((context, event) => ({
      createTodo: undefined,
    })),
  },

  services: {},

  guards: {
    // We have not yet set the todos in context so
    // we need to check the event data instead.
    hasTodos: (context, event) => event.data.length > 0,
  },

  // delays: {},
  // activities: {},
});