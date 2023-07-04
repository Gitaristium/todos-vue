import type { TTodo, TTodos } from "@/utils/types";
import { createStore } from "vuex";

const initialState = {
    todos: [] as unknown as TTodos,
};

export default createStore({
    state: initialState,

    mutations: {
        addTodos(state) {
            state.todos = localStorage.getItem("todos")
                ? JSON.parse(localStorage.getItem("todos") || "")
                : initialState.todos;
        },

        addTodo(state, action) {
            state.todos = [
                ...state.todos,
                { id: Date.now(), text: action, completed: false },
            ];
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },

        removeTodo(state, action) {
            state.todos = state.todos.filter((t: TTodo) => t.id !== action);
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },

        toggleTodo(state, action) {
            state.todos = state.todos.map((t: TTodo) =>
                t.id === action ? { ...t, completed: !t.completed } : t
            );
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },

        editTodo(state, action) {
            state.todos = state.todos.map((t: TTodo) =>
                t.id === action.id ? { ...t, text: action.text } : t
            );
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
    },

    actions: {
        ADD_TODOS({ commit }) {
            commit("addTodos");
        },

        ADD_TODO({ commit }, text: string) {
            commit("addTodo", text);
        },

        REMOVE_TODO({ commit }, id: number) {
            commit("removeTodo", id);
        },

        TOGGLE_TODO({ commit }, id: number) {
            commit("toggleTodo", id);
        },

        EDIT_TODO({ commit }, edit: { id: number; text: string }) {
            commit("editTodo", edit);
        },
    },

    getters: {
        getTodos: (state): TTodos => {
            return state.todos;
        },
        getCountCompletedTodos: (state): number => {
            return state.todos.filter((todo: TTodo) => todo.completed === true)
                .length;
        },
        getCountIncompleteTodos: (state): number => {
            return state.todos.filter((todo: TTodo) => todo.completed === false)
                .length;
        },
        getTodosById:
            (state) =>
            (id: number): TTodo | undefined => {
                return state.todos.find((t: TTodo) => t.id === id);
            },
    },

    strict: true,
});
