<template>
    <form @submit.prevent="handleSubmit">
        <input
            type="text"
            placeholder="Text here"
            v-model="formState"
            @input="onInputChange"
        />
        <button @click.prevent="handleSubmit" :disabled="!isActive">
            {{ !todos.length ? "Add your first TODOS" : "Add TODO" }}
        </button>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const todos = computed(() => store.getters.getTodos);

const initialFormState = "";

const formState = ref(initialFormState);
const isActive = ref(false);

const handleReset = () => {
    formState.value = initialFormState;
    isActive.value = false;
};

const onInputChange = () => {
    isActive.value = formState.value !== "" ? true : false;
};

const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formState.value !== "") {
        store.dispatch("ADD_TODO", formState.value);
        handleReset();
    }
};
</script>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    max-width: calc(100% - 1rem);
}
input {
    background-color: transparent;
    border: 0.2rem solid var(--color-heading);
    outline: 0.2rem solid var(--color-heading);
    outline-offset: -0.2rem;
    color: var(--color-heading);
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    transition: outline-offset 0.1s, transform 0.1s, color 0.2s, border 0.2s,
        outline 0.2s;
    width: 25rem;
    max-width: calc(100% - 1rem);
    &:focus {
        outline-offset: 0.2rem;
    }
}

button {
    background-color: transparent;
    border: 0.2rem solid var(--color-heading);
    outline: 0.2rem solid var(--color-heading);
    outline-offset: -0.2rem;
    color: var(--color-heading);
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s, transform 0.1s, opacity 0.2s;
    width: 25rem;
    max-width: calc(100% - 1rem);

    @media (hover: hover) {
        &:hover {
            background-color: var(--color-heading);
            color: var(--color-background);
        }
    }

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        opacity: 0.5;
        cursor: auto;
        pointer-events: none;
    }
}
</style>
