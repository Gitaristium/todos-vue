<template>
    <form>
        <input
            type="text"
            placeholder="Text here"
            v-model="formState"
            @input="onInputChange"
            :class="{ completed: todo.completed }"
        />

        <svg
            class="btn completed-btn"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72 72"
            width="64px"
            height="64px"
            @click="handleToggle(todo.id)"
            :class="{ uncompleted: !todo.completed }"
        >
            <path
                d="M57.658,12.643c1.854,1.201,2.384,3.678,1.183,5.532l-25.915,40c-0.682,1.051-1.815,1.723-3.064,1.814	C29.764,59.997,29.665,60,29.568,60c-1.146,0-2.241-0.491-3.003-1.358L13.514,43.807c-1.459-1.659-1.298-4.186,0.36-5.646	c1.662-1.46,4.188-1.296,5.646,0.361l9.563,10.87l23.043-35.567C53.329,11.971,55.806,11.442,57.658,12.643z"
            />
        </svg>
        <svg
            class="btn delete-btn"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72 72"
            width="64px"
            height="64px"
            @click="handleDelete(todo.id)"
        >
            <path
                d="M 32 13 C 30.895 13 30 13.895 30 15 L 30 16 L 17 16 C 14.791 16 13 17.791 13 20 C 13 21.973645 14.432361 23.602634 16.3125 23.929688 L 18.707031 52.664062 C 19.053031 56.811062 22.520641 60 26.681641 60 L 45.318359 60 C 49.479359 60 52.945969 56.811062 53.292969 52.664062 L 55.6875 23.929688 C 57.567639 23.602634 59 21.973645 59 20 C 59 17.791 57.209 16 55 16 L 42 16 L 42 15 C 42 13.895 41.105 13 40 13 L 32 13 z M 24.347656 24 L 47.652344 24 L 45.396484 51.082031 C 45.352484 51.600031 44.918438 52 44.398438 52 L 27.601562 52 C 27.081562 52 26.647469 51.600031 26.605469 51.082031 L 24.347656 24 z"
            />
        </svg>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

// eslint-disable-next-line no-undef
const todo = defineProps<{
    id: number;
    text: string;
    completed: boolean;
}>();

const store = useStore();
const todos = computed(() => store.getters.getTodos);

const initialFormState = ref(todo.text);

const formState = ref(initialFormState);
const isActive = ref(false);
const isFocused = ref(false);

const onInputChange = () => {
    isActive.value = formState.value !== "" ? true : false;
    if (formState.value !== "") {
        const payload = {
            id: todo.id,
            text: formState.value,
        };
        store.dispatch("EDIT_TODO", payload);
    }
};

const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formState.value !== "") {
        const payload = {
            id: todo.id,
            text: formState.value,
        };
        store.dispatch("EDIT_TODO", payload);
    }
};

const handleToggle = (id: number) => {
    store.dispatch("TOGGLE_TODO", id);
};
const handleDelete = (id: number) => {
    store.dispatch("REMOVE_TODO", id);
};
</script>

<style lang="scss" scoped>
form {
    position: relative;
    max-width: calc(100% - 1rem);

    @media (hover: hover) {
        &:hover .delete-btn {
            opacity: 1;
            pointer-events: all;
        }
    }

    @media (max-width: 550px) {
        max-width: calc(100% - 6rem);
    }
}
input {
    background-color: var(--color-heading);
    border: 0.2rem solid var(--color-heading);
    outline: 0.2rem solid var(--color-heading);
    outline-offset: -0.2rem;
    color: var(--color-background);
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    transition: outline-offset 0.1s, transform 0.1s, background-color 0.2s,
        color 0.2s, border 0.2s, outline 0.2s;
    width: 25rem;
    max-width: 100%;
    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            outline-offset: 0.2rem;
        }
    }

    &.completed {
        background-color: var(--color-text);
        outline-color: var(--color-text);
        border: 0.2rem solid var(--color-text);
        text-decoration: line-through;
        text-decoration-color: var(--color-background);
    }

    &:focus {
        outline-offset: 0.2rem;
        background-color: transparent;
        color: var(--color-heading);
    }
}

.btn {
    position: absolute;
    top: 1rem;

    width: 2rem;
    height: auto;
    border: 0.2rem solid var(--color-heading);
    outline: 0.2rem solid var(--color-heading);
    outline-offset: -0.2rem;
    border-radius: 50%;
    padding: 0.2rem;
    cursor: pointer;

    transition: outline-offset 0.1s, transform 0.1s, color 0.2s, border 0.2s,
        outline 0.2s, opacity 0.2s;

    & path {
        fill: var(--color-heading);
        transition: fill 0.2s;
    }

    @media (hover: hover) {
        &:hover {
            outline-offset: 0.2rem;
            background-color: var(--color-heading);
            & path {
                fill: var(--color-background);
            }
        }
    }

    &:active {
        transform: scale(0.95);
    }

    &.completed-btn {
        left: -2.6rem;

        &.uncompleted path {
            fill: transparent;
        }
    }
    &.delete-btn {
        right: -2.6rem;

        @media (min-width: 551px) {
            opacity: 0;
        }
    }
}
</style>
