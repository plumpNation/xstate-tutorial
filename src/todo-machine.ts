import { createMachine } from "xstate";

export const todoMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHRo7AMqgIYQCWAdlAMQAqA8gCJ0DKA+vnQIIMCSAcgHFWAMU498AVQBKAUQDaABgC6iUAAdMpZKVTlVIAB6IAnAqwKAzACZjAdgAsV+xYCMANnsK3AGhABPRFszFwBWewAORwtbNyDw43CAX0TfXEwcdExCEgpqeiY2Dm5+IWYJAGFymWZmRRUkEA1YLR09BqMEAFoXKxcsF3De+ON7F083KxDfAIQXCzcscPCJmKcQlxdbK2TUzOw0gmIISFpGFnYuXkFWWQBFCWqaOv0mlt19Ds6LEawrXtsLPFbCELCE-tNEHMFksVhN7OtNu4diADhk8NkyJRhERSAAbE75c5FK5CO4PZhPZQvTTad7tRDWaFbWwjFzGDzGdkQhC2foKdw9WyhGLGKzhELJFIgcjoOD6A7U5q0tqgT72Ry-f6AuwgsFWbmdcJmbUREJuBReMIWZGog4Y3KKt4qwyITpCrAWBTs0WAsU9Kb+RBucJYUyRJzRByjew2vZorJHSCO5UfV3mj3fNyRs0WewxM3cqwKEKh2KOJzi0GhNyxvDxw45LE4-EQZOtVMIUHGLAxHrw5kg0w+QMIYOhhTh5y2KNjWvpchgADuAAJYMgiMgwMuXG26arXdZ7Bn2dms3m3MOZkW+r1Ac5zcZrHNJYkgA */
  id: 'todos',
  initial: "todosLoading",
  predictableActionArguments: true,

  states: {
    todosLoading: {
      on: {
        TODOS_LOADING_FAILURE: "todosLoadingFailed",
        TODOS_LOADING_SUCCESS: "todosLoadingSuccess"
      }
    },

    todosLoadingSuccess: {
      on: {
        TODOS_LOADING_REQUEST: "todosLoading"
      }
    },

    todosLoadingFailed: {
      on: {
        TODOS_LOADING_REQUEST: "todosLoading"
      }
    },
    "new state 1": {}
  },
});