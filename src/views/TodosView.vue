<template>
    <div class="container">
        <div class="wrapper">
            <TodoItem
                v-for="todo in todos"
                v-bind:key="todo.id"
                :id="todo.id"
                :text="todo.text"
                :completed="todo.completed"
            />
            <AddNewTodo />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import AddNewTodo from "@/components/AddNewTodo.vue";
import TodoItem from "@/components/TodoItem.vue";

const store = useStore();
const todos = computed(() => store.getters.getTodos);
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    min-height: calc(100vh - var(--padding-top));
    overflow-y: auto;
    padding: 2rem 0;
}
</style>
