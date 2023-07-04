<template>
    <div class="container">
        <div class="wrapper">
            <HomeIcon />
            <div class="row">
                <h3>
                    completed todos: <span>{{ completedCount }}</span>
                </h3>
                <h3>
                    incomplete todos: <span>{{ incompletedCount }}</span>
                </h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HomeIcon from "@/components/HomeIcon.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const completedCount = computed(() => store.getters.getCountCompletedTodos);
const incompletedCount = computed(() => store.getters.getCountIncompleteTodos);
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: calc(100vh - var(--padding-top));
}

h3 {
    font-size: 1.5rem;
    & span {
        font-size: 2rem;
    }
}
</style>
