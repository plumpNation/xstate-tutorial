
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.todos.todoCreate.todoSaving:invocation[0]": { type: "done.invoke.todos.todoCreate.todoSaving:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.todos.todoDelete:invocation[0]": { type: "done.invoke.todos.todoDelete:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.todos.todoUpdate:invocation[0]": { type: "done.invoke.todos.todoUpdate:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.todos.todosLoading:invocation[0]": { type: "done.invoke.todos.todosLoading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.todos.todoDelete:invocation[0]": { type: "error.platform.todos.todoDelete:invocation[0]"; data: unknown };
"error.platform.todos.todosLoading:invocation[0]": { type: "error.platform.todos.todosLoading:invocation[0]"; data: unknown };
"xstate.after(2000)#todos.todoDeleteErrored": { type: "xstate.after(2000)#todos.todoDeleteErrored" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "deleteTodo": "done.invoke.todos.todoDelete:invocation[0]";
"fetchTodos": "done.invoke.todos.todosLoading:invocation[0]";
"saveTodo": "done.invoke.todos.todoCreate.todoSaving:invocation[0]";
"toggleTodo": "done.invoke.todos.todoUpdate:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "deleteTodo" | "fetchTodos" | "saveTodo" | "toggleTodo";
        };
        eventsCausingActions: {
          "assignDeleteErrorToContext": "error.platform.todos.todoDelete:invocation[0]";
"assignErrorToContext": "error.platform.todos.todosLoading:invocation[0]";
"assignFormToContext": "FORM_CHANGED";
"assignTodosToContext": "done.invoke.todos.todosLoading:invocation[0]";
"undefineFormToContext": "done.invoke.todos.todoCreate.todoSaving:invocation[0]";
        };
        eventsCausingDelays: {

        };
        eventsCausingGuards: {
          "hasTodos": "done.invoke.todos.todosLoading:invocation[0]";
        };
        eventsCausingServices: {
          "deleteTodo": "TODO_DELETED";
"fetchTodos": "CANCEL_DELETE_ERROR" | "done.invoke.todos.todoCreate.todoSaving:invocation[0]" | "done.invoke.todos.todoDelete:invocation[0]" | "done.invoke.todos.todoUpdate:invocation[0]" | "xstate.after(2000)#todos.todoDeleteErrored" | "xstate.init";
"saveTodo": "FORM_SUBMITTED";
"toggleTodo": "TODO_TOGGLED";
        };
        matchesStates: "todoCreate" | "todoCreate.todoForm" | "todoCreate.todoSaving" | "todoDelete" | "todoDeleteErrored" | "todoUpdate" | "todosErrored" | "todosLoaded" | "todosLoading" | { "todoCreate"?: "todoForm" | "todoSaving"; };
        tags: never;
      }
