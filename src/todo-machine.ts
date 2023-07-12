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
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHRo7AMqgIYQCWAdlAMQblhYUBuqA1vbpjupoSRVAiaoAxkWSlU5ANoAGALqy5iUAAdMpcZOUgAHogDMANgAsWQzICMFgOwAOAJzHbAJlvXrAGhABPAyazWMs4y+o4ArDahhgC+0V4c2Am8ZJRUYABO6ajpWCoANmIAZtkAtlx45TzEKQJCoprS8oraarAaEuTaegg29lgy1qEOQbbGYcbOhl6+CEamgcH6ViZOFrHx3ImbyZBUACoA8gAiBwD6AMIASgCiAIJ7181IIK3tWs-dwc5YxtYWYfYZJY-sYrM5poh7BZDFgwvonA53M4JoZ9OsQAlKgRqrtDidTkdrvhrg8jk9VOoGl1EABaQzWLBGf4hWzjGSGexhCEIQa2LD2QK2aEWUIDP7ozEcI5gPJgZBgGiSehCNhYyrS2XywTkZj1DqKckvSkdakIGnOGxYVn6fS2KLI2yjbk2CxYZGBAFhZx2P4xOIYzbqmVyhUZLI5fJFUpqqXBrV1MT6pryFrG96gT7GPquEX2Zx5kURcE+RAimR9G0WPPOIw1kxrf2S7gakPXTLZXY6WDIMT0IiFeXpAAUwSBAEoqE2MC35W3w5BDa8qR9aSL9Pyq6yZBM8+ZDFMSz1jDb+Tb7Of82E-mEJYGOOd0mBe5UAGKlKgvg6XACyFwAErcAByADi1xkimzxLiaK4IFmMLWOe1gmNuebsvo3IuOufxRCK1hhIYYQDLeFT3o+z4cG+6QlB+X6-gAygAqgAQt+ACSeykouaadDBdhhP0AL7jIhHGE43rcpyfLjMYIRVueCI3o2d7cA+T7ypUdFEIw-CKnQDA6qw7DKRgqnkdwmnaZQ2q6omkgGhBFJtMuGaIIYxYzEKrr6NYWaeSijhokpJEqWR6kcBZOlhtkuQFMgxRUTGIVqUZGARVZCYNPZSiQdxpomN8UIuNYrgckY4zOtuMJVhymHuJYoLEZwsaamAc4dhAVDnEB5xEgSRIktcpzXJclxflxTnQS5ZoWE4VpjKi+iEcVNbGM6RgMiKFpBF6on0rE-rkOgcDaAkqYTemui0pM-HWra9oIqth4zQEjoOCYglAgR1iNVseDJPwZ1vDxU0TBV3yuECQJRMewR+hswV-TiECA85l2wRYfKshaGNhACSGDFyh77lVhH2Es4wIUhDbw01mxtY+yM5edwNoxY24-C60KGJuULGAeMyojCx7nvoyLshEoQ-UGLUo5NaMyM6ziEfyXrbnY3mArYUvNa27YM7LF3dArT0wz8rhjIRQp8zN2tJb2Bss90oqMpYZM7XY7L84ggwws4fuOv8owYyKtsmaFKWoJRJQO6ax58voruLe6tiexJQpusJhgON55YAlrQW02HyUaVpANM0Dpp2t8IQyf8DoJ+ezpszCnLBL8doITI+exEAA */
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
      }
    },

    events: {} as
      | {
          type: "TODO_CREATE";
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
        },
        TODO_DELETED: {
          target: "todoDelete",
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
              actions: "undefineFormToContext",
            },
          },
        },

        todoSaving: {
          invoke: {
            src: "saveTodo",
            onError: "todoForm",
            onDone: "#todos.todosLoading"
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

  // guards: {},
  // delays: {},
  // activities: {},
});