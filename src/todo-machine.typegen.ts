
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.todos.todosLoading:invocation[0]": { type: "done.invoke.todos.todosLoading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.todos.todosLoading:invocation[0]": { type: "error.platform.todos.todosLoading:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "fetchTodos": "done.invoke.todos.todosLoading:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "fetchTodos";
        };
        eventsCausingActions: {
          "assignErrorToContext": "error.platform.todos.todosLoading:invocation[0]";
"assignFormToContext": "FORM_CHANGED";
"assignTodosToContext": "done.invoke.todos.todosLoading:invocation[0]";
        };
        eventsCausingDelays: {

        };
        eventsCausingGuards: {

        };
        eventsCausingServices: {
          "fetchTodos": "xstate.init";
        };
        matchesStates: "todoCreate" | "todoCreate.todoForm" | "todosErrored" | "todosLoaded" | "todosLoading" | { "todoCreate"?: "todoForm"; };
        tags: never;
      }
